import pkg from 'body-parser';
const { json } = pkg;

import {
  find_all,
  create_news,
  delete_news,
  find_one,
  update_one,
} from "../models/news.js";
export const findAllNewsMiddleware = (req, res, next) => {
  find_all()
    .then((data) => {
      if (data.length == 0) {
        return res.json({ error: false, message: "Список новостей пуст" });
      } else {
        req.news = data;
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

export const addNewsMiddleware = (req, res, next) => {
  create_news(req.body)
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

export const deleteNewsMiddleware = (req, res, next) => {
  delete_news()
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

export const getNewsByIdMiddleware = (req, res, next) => {
  find_one(req.params.id)
    .then((data) => {
      if (data.length == 0) {
        return res.json({ error: false, message: "Нет такой новости" });
      } else {
        req.news = data;
        next();
      }
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Не удалось обнаружить новость",
      });
    });
};

export const updateNewsByIdMiddleware = (req, res, next) => {
  update_one(req.params.id, req.body)
    .then((data) => {
      if(data.affectedRows == 8){
        return res.json({
          error: true,
          message: "Новость не найдена",
        })
      }
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Не удалось обновить новость",
      });
    });
};

export const deleteNewsByIdMiddleware = (req, res, next) => {
  delete_news(req.params.id, req.body)
    .then((data) => {
      next();
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Запись не удалена",
      });
    });
};
