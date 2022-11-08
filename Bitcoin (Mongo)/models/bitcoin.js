import mongoose from "mongoose"

const BitcoinSchema = new mongoose.Schema({
    code: String,
    rate: String,
    date: String,
})

const Bitcoin = mongoose.model("Bitcoin", BitcoinSchema)
export default Bitcoin;