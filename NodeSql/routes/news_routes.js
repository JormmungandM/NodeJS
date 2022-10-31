import { Router } from "express";
import {
  findAllNewsMiddleware,
  addNewsMiddleware,
  deleteNewsMiddleware,
  getNewsByIdMiddleware,
  updateNewsByIdMiddleware,
  deleteNewsByIdMiddleware,

} from "../controllers/news_controller.js";
import { MyLogger } from "../app.js";

const router_news = Router();

router_news
  .route("/news")
  .get(findAllNewsMiddleware, (req, res) => {
    MyLogger.info("file name: 'news_routes.js', route: '/news', type request: 'GET', ip user: " + "'" + req.ip + "'" )
    res.json({ error: false, news: req.news });
  })
  .post(addNewsMiddleware, (req, res) => {
    MyLogger.info("file name: 'news_routes.js', route: '/news' , type request: 'POST', ip user: " + "'" + req.ip + "'" )
    res.json({ error: false, message: "Запись успешно добавлена" });
  })
  .delete(deleteNewsMiddleware, (req, res) => {
    MyLogger.info("file name: 'news_routes.js', route: '/news' , type request: 'DELETE', ip user: " + "'" + req.ip + "'" )
    res.json({ error: false, message: "Записи успешно удалены" });
  });

router_news
  .route("/news/:id")
  .get(getNewsByIdMiddleware, (req, res) => {
    MyLogger.info("file name: 'news_routes.js', route: '/news/:id' , type request: 'GET', ip user: " + "'" + req.ip + "'" )
    res.json({ error: false, news: req.news });
  })
  .put(updateNewsByIdMiddleware, (req, res) => {
    MyLogger.info("file name: 'news_routes.jss', route: '/news/:id' , type request: 'POST', ip user: " + "'" + req.ip + "'" )
    res.json({ error: false, message: "Успешно обновили новость" });
  })
  .delete(deleteNewsByIdMiddleware, (req, res) => {
    MyLogger.info("file name: news_routes.js', route: '/news/:id' , type request: 'DELETE', ip user: " + "'" + req.ip + "'" )
    res.json({ error: false, message: "Запись успешно удалена" });
  });

export default router_news;
