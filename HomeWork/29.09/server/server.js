// Модули
const express = require('express'); // подключение express
const fs = require('fs');
const path = require('path')

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});

// создаем объект приложения
const app = express();


// подключаем стили  
app.get('/style.css',function(req,res) {
    res.sendFile(path.resolve(__dirname,'../fStyle','style.css'));
  });

// определяем обработчик для маршрута "/" и открываем файл
app.get('/',function(req,res) {
    res.sendFile(path.resolve(__dirname,'../views','index.html'));
  });

  // определяем обработчик для маршрута "/about" и открываем файл
  app.get('/about',function(req,res) {
    res.sendFile(path.resolve(__dirname,'../views','about.html'));
  });

    // определяем обработчик для маршрута "/contacts" и открываем файл
  app.get('/contacts',function(req,res) {
    res.sendFile(path.resolve(__dirname,'../views','contacts.html'));
  });

    // определяем обработчик для маршрута "/login" и открываем файл
  app.get('/login',function(req,res) {
    res.sendFile(path.resolve(__dirname,'../views','login.html'));
  });

    // определяем обработчик для маршрута "/registration" и открываем файл
  app.get('/registration',function(req,res) {
    res.sendFile(path.resolve(__dirname,'../views','registration.html'));
  });

  // Post login 
  app.post('/login', urlencodedParser ,function(req,res) {
    res.sendFile(path.resolve(__dirname,'../views','login.html'));    // при отправки запроса остаемся на странице
    if(!req.body) return res.sendStatus(400);   // если возникла ошибка

    const buff = Buffer.alloc(1024); 

    // Обрабатываем текущую дату дату
    let ts = Date.now();
    let date_ob = new Date(ts);       

    let date = date_ob.getDate();           // день
    let month = date_ob.getMonth() + 1;     // месяц
    let year = date_ob.getFullYear();       // год 

    let hours = date_ob.getHours();         // часы
    let minutes = date_ob.getMinutes();     // минуты  
    let seconds = date_ob.getSeconds();     // секунды 
    
    // создаем буфер
    buff.write("Пользователь " + req.body.Login + " - пытался зайти на сайт в "+ hours + ":" + minutes + ":" + seconds + " " + date + "-" + month + "-" + year +  "\n");   // записывает данные пользователя в файл
    fs.appendFile("../Data/DataTimeLogin.txt", buff, function(error){
      
      if(error) throw error; // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
      let data = fs.readFileSync("../Data/DataTimeLogin.txt", "utf8");
      console.log(data);  // выводим считанные данные
    });
  });

  // Post registration 
  app.post('/registration', urlencodedParser ,function(req,res) {
    res.sendFile(path.resolve(__dirname,'../views','registration.html'));   // при отправки запроса остаемся на странице
    if(!req.body) return res.sendStatus(400);   // если возникла ошибка
   
    if(req.body.UserPassword == req.body.UserPasswordRepeat) {
      const buff = Buffer.alloc(1024);                                                                  // создаем буфер
      buff.write(req.body.Login + " , " + req.body.UserPassword + " , " + req.body.UserEmail + "\n");   // записывает данные пользователя в файл

      fs.appendFile("../Data/Users.txt", buff, function(error){
  
        if(error) throw error; // если возникла ошибка
        console.log("Асинхронная запись файла завершена. Содержимое файла:");
        let data = fs.readFileSync("../Data/Users.txt", "utf8");
        console.log(data);  // выводим считанные данные
      });
    }else return res.sendStatus(400);

  });


app.listen(3000);

