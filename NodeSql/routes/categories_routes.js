import { Router } from "express";

import {
    findAllCategoriesMiddleware,
    addCategoriesMiddleware,
    deleteCategoriesMiddleware,

} from "../controllers/categories_controller.js";

import { MyLogger } from "../app.js";

const router_categories = Router();

router_categories
  .route("/categories")
  .get(findAllCategoriesMiddleware, (req, res) => {
    MyLogger.info("file name: 'router_categories.js', route: '/categories', type request: 'GET', ip user: " + "'" + req.ip + "'" )
    res.json({ error: false, categories: req.categories });
  })
  .post(addCategoriesMiddleware, (req, res) => {
    MyLogger.info("file name: 'router_categories.js', route: '/categories' , type request: 'POST', ip user: " + "'" + req.ip + "'" )
    res.json({ error: false, message: "Запись успешно добавлена" });
  })
  .delete(deleteCategoriesMiddleware, (req, res) => {
    MyLogger.info("file name: 'router_categories.js', route: '/categories' , type request: 'DELETE', ip user: " + "'" + req.ip + "'" )
    res.json({ error: false, message: "Записи успешно удалены" });
  });

export default router_categories;
