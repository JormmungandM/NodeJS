import pkg from 'body-parser';

const { json } = pkg;


import {   
    find_all,
    create_categories,
    delete_categories,
 } from "../models/categories.js";


export const findAllCategoriesMiddleware = (req, res, next) => {
  find_all()
    .then((data) => {
      if (data.length == 0) {
        return res.json({ error: false, message: "Список новостей пуст" });
      } else {
        req.categories = data;
        next();
      }
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Не удалось получить список новостей",
      });
    });
};

export const addCategoriesMiddleware = (req, res, next) => {
    create_categories(req.body)
    .then((data) => {
      next();
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Запись не добавлена",
      });
    });
};

export const deleteCategoriesMiddleware = (req, res, next) => {
    delete_categories()
    .then((data) => {
      next();
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Записи не удалены",
      });
    });
};


