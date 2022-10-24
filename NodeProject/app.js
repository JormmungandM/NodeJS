import express from "express"; //подключили пакет с фреймворком
import path from "path";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import ejsMate from "ejs-mate";
import cookieParser from "cookie-parser";
import session from "express-session";
import cookieSession from "cookie-session";
import { config } from "./config/config.js";

//импортируем библиотеки для работы socket.io
import http from "http";
import { Server } from "socket.io";

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000; //определили port
const app = express();

var count = 0; // переменная текущих пользователей 
const server = http.createServer(app);  
const io = new Server(server); 

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


io.on('connection', (socket) => { 
  count = count + 1; //прослушиваю событие подключения, когда пользователь подключается + 1
  socket.on('disconnect', () => {
    count = count - 1; //прослушиваю событие отключения, когда отключается подключается - 1
  });
})


app.listen(PORT, () => {
  console.log(`Server has been started http//localhost:${PORT}`);
});

export default count; // передаем в routes