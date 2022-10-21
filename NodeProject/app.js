import express from "express"; //подключили пакет с фреймворком
import path from "path";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import ejsMate from "ejs-mate";
import cookieParser from "cookie-parser";
import session from "express-session";
import { config } from "./config/config.js";
const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000; //определили port
const app = express();
app.use(cookieParser(config.secret_key));
app.use(
  session({
    secret: config.secret_key,
    resave: false,
    saveUninitialized: true,
  })
);
app.engine("ejs", ejsMate);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public"))); //middleware подключение статических данных (js, css, pictures)
app.use(router);
app.listen(PORT, () => {
  console.log(`Server has been started http//localhost:${PORT}`);
});
