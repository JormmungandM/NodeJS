// Модули
const express = require('express'); // подключение express
const fs = require('fs');

// создаем объект приложения
const app = express();



// определяем обработчик для маршрута "/"
app.get('/',function(req,res) {
    res.sendFile('index.html');
  });



app.listen(3000);

