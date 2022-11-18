import mongoose from "mongoose";

export const config = {
    mongo:'mongodb+srv://user191:pass191@cluster0.bmbuyeh.mongodb.net/?retryWrites=true&w=majority',
    PORT:3000,
}

const exchangeSchema = new mongoose.Schema({
    code:String,
    rate:String,
    date:String
}) 

export const Exch = mongoose.model('exchangeRates ',exchangeSchema)
