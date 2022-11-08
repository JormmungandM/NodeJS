import { Router } from "express"
import mongoose from "mongoose"
import request from "request";
import config from "../config/main.js"
import  Bitcoin from "../models/bitcoin.js"

const router = new Router();

router.route("/bitcoin")
.get((req, res) => {

    // получаем данные о биткоине
    request("https://api.coindesk.com/v1/bpi/currentprice.json", function(error, response, body) {
    const bitcoin = JSON.parse(body); // преобразуем строку данных в объект bitcoin
    const {EUR, USD, GBP} = bitcoin.bpi;

    // инфо в консоль 
    console.log("Date: " + bitcoin.time.updated)
    console.log("Bitcoin. " + EUR.code + " -> " + EUR.rate)
    console.log("Bitcoin. " + USD.code + " -> " + USD.rate)
    console.log("Bitcoin. " + GBP.code + " -> " + GBP.rate)
    
    // подключаемся и сохраняем
    mongoose.connect(config.mongo)
        .then(()=>{
            console.log("Connected...");
            
            start(EUR.code, EUR.rate, bitcoin.time.updated)     // EUR
            start(USD.code, USD.rate, bitcoin.time.updated)     // USD 
            start(GBP.code, GBP.rate, bitcoin.time.updated)     // GBP
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
