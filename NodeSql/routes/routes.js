import { Router } from "express";
import {
  findAllNewsMiddleware,
  addNewsMiddleware,
  deleteNewsMiddleware,
  getNewsByIdMiddleware,
  updateNewsByIdMiddleware,
  deleteNewsByIdMiddleware,
} from "../controllers/news_controller.js";
const router = Router();
router
  .route("/news")
  .get(findAllNewsMiddleware, (req, res) => {
    res.json({ error: false, news: req.news });
  })
  .post(addNewsMiddleware, (req, res) => {
    res.json({ error: false, message: "Запись успешно добавлена" });
  })
  .delete(deleteNewsMiddleware, (req, res) => {
    res.json({ error: false, message: "Записи успешно удалены" });
  });

router
  .route("/news/:id")
  .get(getNewsByIdMiddleware, (req, res) => {
    res.json({ error: false, news: req.news });
  })
  .put(updateNewsByIdMiddleware, (req, res) => {
    res.json({ error: false, message: "Успешно обновили новость" });
  })
  .delete(deleteNewsByIdMiddleware, (req, res) => {
    res.json({ error: false, message: "Запись успешно удалена" });
  });

export default router;
