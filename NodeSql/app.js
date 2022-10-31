import express from "express";
import config from "./config/config.js";
import router_news from "./routes/news_routes.js";
import router_user from "./routes/user_routes.js";
import logger from 'logger'
import cors from 'cors';  // подключаю модуль corse 'http://expressjs.com/en/resources/middleware/cors.html'


export var MyLogger = logger.createLogger('development.log'); // создаем logger и сохраняем логи в файл 'development.log'
MyLogger.format = function(level, date, message) {            // меняю формат логов
  return "["  // делаю свой формат даты
  + date.getDate() + "."          
  + (date.getMonth()+1) + "." 
  + date.getFullYear() + ", "
  + date.getHours() + ":"
  + date.getMinutes() + ":"
  + date.getSeconds() +
  "] -" 
  + message;  // сообщение передаваемое в MyLogger.info()
};

app.use(cors()) // Включаю corse в проект

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("X-Powered-By", "Apache");
  next();
});

app.use(router_news);
app.use(router_user);

app.use("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(config.PORT, () => {
  console.log(`http://localhost:${config.PORT}`);
});