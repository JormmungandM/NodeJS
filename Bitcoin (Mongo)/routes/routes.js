import { Router } from "express"
import mongoose from "mongoose"
import request from "request";
import config from "../config/main.js"
import  Bitcoin from "../models/bitcoin.js"

const router = new Router();

router.route("/bitcoin")
.get((req, res) => {

    request("https://api.coindesk.com/v1/bpi/currentprice.json", function(error, response, body) {
    const bitcoin = JSON.parse(body);
    const {EUR, USD, GBP} = bitcoin.bpi;

    // инфо в консоль 
    console.log("Date: " + bitcoin.time.updated)
    console.log("Bitcoin. " + EUR.code + " -> " + EUR.rate)
    console.log("Bitcoin. " + USD.code + " -> " + USD.rate)
    console.log("Bitcoin. " + GBP.code + " -> " + GBP.rate)
    

    mongoose.connect(config.mongo)
        .then(()=>{
            console.log("Connected...");
            //EUR
            start(EUR.code, EUR.rate, bitcoin.time.updated)
            //USD
            start(USD.code, USD.rate, bitcoin.time.updated)
            //GBP
            start(GBP.code, GBP.rate, bitcoin.time.updated)
        })
        .catch((err)=>{
            console.log(err);
        })
    });


    
})

async function start(_code, _rate, _data){
    const bitcoin = new Bitcoin ({code:_code, rate:_rate, data:_data});
    await bitcoin.save();
}

export default router;