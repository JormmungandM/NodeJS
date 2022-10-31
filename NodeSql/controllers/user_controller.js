import { create_user } from "../models/user.js";
import bcrypt from "bcryptjs";

export const addUserMiddleware = async (req, res, next) => {
  //валидируем данные всё на пустоту проверяем
  //сравниваем пароли
  //проверяем email
  //проверяем на уникальность
  //хешируем пароль
  //insert
  const { name, email, password, repeat_password } = req.body;
  if (password != repeat_password) {
    return res.json({
      error: true,
      message: "Не совпадают пароли",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(password, salt);
  req.body.salt = salt;
  req.body.password = hash;
  return res.json({
    error: true,
    message: "совпадают пароли",
  });

  create_user(req.body)
    .then((data) => {
      next();
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Ошибка",
      });
    });
};