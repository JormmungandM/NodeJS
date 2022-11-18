import express from "express";
import request from "request";
import mongoose from "mongoose";
import {config,Exch} from "./config/main.js";
const date = new Date();
const app = express()
app.use(express.json())

const url='https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

mongoose.connect(config.mongo)
    .then(()=>{
        console.log("Mongo connected...")
        app.listen(config.PORT,()=>{
            console.log(`http://localhost:${config.PORT}`)
        })
        
    })
    .catch((err)=>{
        console.log(err)
        return
    })

app.get('/exchange/:currency',async (req,res)=>{
    let currency = req.params.currency
    const exch = await Exch.findOne({code:currency})!=null ?await Exch.findOne({code:currency}) : ""
    const dateStr = date.getDate()+"."+date.getMonth()+"."+date.getFullYear()
    if(dateStr!=exch.date)
    {
        let rate = await currentInfo()
        let exchUser
        let exchList=[]
        rate.forEach(element => {
            if(element.r030==currency)
            {
                exchUser = element
            }
            exchList.push(new Exch({code:element.r030,rate:element.rate,date:dateStr}))
        }) 
        try{
            Exch.insertMany(exchList)
            res.send(exchUser)
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }
    else{
        res.send(exch)
    }
})

function currentInfo(){
    return new Promise(function (resolve, reject) {
        request({url:url,json:true},(err,res)=>{
            if (err) reject(err);
            resolve(res.body);
        });
    });
}