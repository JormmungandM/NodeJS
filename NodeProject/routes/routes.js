import Router from "express";
import path from "path";
import news from "../models/news.js";
import methodOverride from "method-override";
import { add_user } from "../controllers/user.controller.js";
import bcrypt from "bcryptjs";
import users from "../models/users.js";
import { appendFile } from "fs";
import count from "../app.js";
import { body, validationResult } from 'express-validator';

const __dirname = path.resolve();
const router = Router();
let selectNews = news; // сохраняем массив с новостями


router.use(methodOverride("X-HTTP-Method")); //          Microsoft
router.use(methodOverride("X-HTTP-Method-Override")); // Google/GData
router.use(methodOverride("X-Method-Override")); //      IBM
router.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);



router
  .route("/")
  .get((req, res) => {
    //res.sendFile(path.resolve(__dirname, "views", "index.html"));
    res.render("index.ejs", {
      title: "My Express (ejs)",
      news: selectNews,
      counter: " " + count, // активные пользователи
      username: req.signedCookies.username,
    });
  })
  .post((req, res) => {
    res.send("<h1>Express POST REQUEST</h1>");
  });


  //add hbs to nav menu set title and message
  router
  .route("/handlebars")
  .get((req,res, next)  => {
    res.render("handlebars.hbs", {
      message: "This is HandleBars",
      username: req.signedCookies.username,
      counter: " " + count, // активные пользователи
    });
  })

  //add pug1 to nav menu set title and message
  router
  .route("/firstPug")
  .get((req,res, next)  => {
    res.render("pug/firstPug.pug", {
      message: "This is first pug",
      username: req.signedCookies.username,
      counter: " " + count, // активные пользователи
    });
  })

  //add pug2 to nav menu set title and message
  router
  .route("/secondPug")
  .get((req,res, next)  => {
    res.render("pug/secondPug.pug", {
      message: "This is second pug",
      username: req.signedCookies.username,
      counter: " " + count, // активные пользователи
    });
  })



router.route("/news")
  .get((req, res) => {
    console.log(req.cookies)
    res.render("news.ejs", {
      title: "News",
      news: selectNews,
      username: req.cookies.username,
      counter: " " + count, // активные пользователи
    });
  })

  router.route("/news/search")
  .post((req, res) => {
    const fNews = req.body;   // получаем данные с сайта
    selectNews = []    // создаем массив
    news.find(item => {       // реализуем поиск по полученным данным 
        if(item.title.toLowerCase().indexOf(fNews.fNews.toLowerCase()) != -1)   // изменяем регистр в нижний и проводим поиск совпадений 
        {                                                                       // если нашло то добавляем в массив 
          selectNews.push(item);
        }            
      })
    res.redirect("/news")
  });

  router.route("/news/add")
  .post(
    body('TitleNews').isLength({ min: 16 }),  // проверка на кол-во символов
    body('TextNews').isLength({ min: 120 }),  // проверка на кол-во символов
    (req, res) => {
    const {TitleNews,TextNews} = req.body;   // получаем данные с сайта 
    let biggest;
    if (news.length !== 0) {                    // создаем новый индекс, который больше предыдущего 
      biggest = news.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      );
    }
    //  Добавляем новость в массив
    news.push({
      id: biggest ? biggest.id + 1 : 1,
      title: TitleNews,
      text: TextNews,
    });
    res.redirect("/news")
  });

  function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
  }
  
  // Сортировка массива по title
  router.route("/news/sort")
  .post((req, res) => {
    news.sort(byField('title')) //сортировка по title
    res.redirect("/news");
  });


router
  .route("/register")
  .get((req, res) => {
    res.render("register", {
      title: "Регистрация",
      username: req.signedCookies.username,
      counter: " " + count, // активные пользователи
    });
  })
  .post(
  add_user,
  // Валидация для регистрация 
  body('email').custom(value => {  // проверка почты на занятость
    return users.findUserByEmail(value).then(user => {
      if (user) {
        return Promise.reject('Этот электронный адрес уже занят');
      }
    });
  }),
  body('password').isLength({ min: 8 }), // проверка поля password
  body('repeat_password').custom((value, { req }) => { // проверка поля repeat_password
    if (value !== req.body.password) {
      throw new Error('Подтверждение пароля не соответствует паролю');
    }
    return true;
  }), 
  (req, res) => {
    //console.log(req.session.username);
    //console.log(req.body);
    //console.log(req.cookies.username)
    res.redirect("/register");
  });

router
  .route("/login")
  .get(  
  (req, res) => {
    res.render("login", { title: "Login" });
  })
  .post(async (req, res) => {
    const { login, password } = req.body;
    let obj = users.find((el) => el.login === login);
    if (obj) {
      const hash = await bcrypt.hashSync(password, obj.salt);
      if (hash === obj.password) {
        req.session.login = obj.name;
        console.log(req.session.username, "login");
        // res.cookie("username", obj.name, {
        //   maxAge: 3600 * 24, // 1 сутки
        //   signed: true,
        // });
      }
    }
    res.redirect("/");
  });

router.route("/logout").get((req, res) => {
  if (req.cookies.username) res.clearCookie("username");
  res.render("index", {
    title: "Index",
    news: news,
    username: req.signedCookies.username,
    counter: " " + count, // активные пользователи
  });
});

export default router;
