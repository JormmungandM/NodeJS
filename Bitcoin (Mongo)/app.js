import express from "express";
import config from "./config/main.js"
import router from "./routes/routes.js"


// mongoose.connect(config.mongo)
// .then(()=>{
//     console.log("Connected...");
// })
// .catch((err)=>{
//     console.log(err);
// })

const app = express();
app.use(express.json());
app.use(router);

app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
});

