import users from "../models/users.js";
import bcrypt from "bcryptjs";

export const add_user = async (req, res, next) => {
  if (req.body) {
    const { name, surname, login, email, password, repeat_password } = req.body;
    if (password === repeat_password) {
      //валидация данных
      let biggest;
      if (users.length !== 0) {
        biggest = users.reduce((prev, current) =>
          prev.id > current.id ? prev : current
        );
      }

      const salt = await bcrypt.genSalt(10);
      console.log(`salt: ${salt}}`);
      const hash = await bcrypt.hashSync(password, salt);
      console.log(`hash: ${hash}`);
      console.log(`salt: ${salt}`);
      users.push({
        id: biggest ? biggest.id + 1 : 1,
        name: name,
        surname: surname,
        login: login,
        email: email,
        salt: salt,
        password: hash,
      });

      res.cookie("username", name, {
        maxAge: 3600 * 24, // 1 сутки
        signed: true,
      });
    }
  }
  next();
};
