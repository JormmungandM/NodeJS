import pkg from 'body-parser';

const { json } = pkg;

import {
  find_all,
  add_car,
  edit_car,
  delete_car
} from "../models/cars.js";

export const PrintAll = (req, res, next) => {
  find_all()
    .then((data) => {
      if (data.length == 0) {
        console.log("PrintAll :: Error");
        return res.json({ error: false});
      } else {
        req.cars = data;
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

export const AddCar = (req, res, next) => {

  if(req.body.year < 1883) return res.json({
    error: true,
    message: "Машина не добавлена",
  });

  add_car(req.body)
    .then((data) => {
      next();
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Машина не добавлена",
      });
    });
};

export const EditCar = (req, res, next) => {

  if(req.body.year < 1883) return res.json({
    error: true,
    message: "Машина не добавлена",
  });

  edit_car(req.body)
    .then((data) => {
      next();
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Машина не удалена",
      });
    });
};

export const DeleteCar = (req, res, next) => {
  delete_car(req.body.id)
    .then((data) => {
      next();
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Машина не удалена",
      });
    });
};