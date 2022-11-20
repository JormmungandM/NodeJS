import express from "express"; //подключили пакет с фреймворком
import ejsMate from "ejs-mate";
import bodyParser from "body-parser";
import router_cars from "./routes/cars_routes.js";

const PORT = process.env.PORT ?? 3000;
const app = express();



app.engine("ejs", ejsMate);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router_cars);


app.listen(PORT, () => {
  console.log(`Server has been started http//localhost:${PORT}`);
});
