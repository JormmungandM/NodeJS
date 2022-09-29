// Подключаем модули 
const https = require('https');             // Модуль https требует сертификат.
const fs = require('fs');                   // Модуль fs позволяет работать с файлами
var formidable = require('formidable');     // Модуль formidable используется для получение файлов от пользователя 




https.createServer({                                    // Подключаем SSL сертификат для работы https 
    cert: fs.readFileSync('./conf/localhost.crt'),      // Сертификат 
    key: fs.readFileSync('./conf/localhost.key')        // Ключ сертификата 
}, (req, res) => {

    
    if (req.url == '/fileUpload') {     // Когда пользователь загрузил файл и оправил срабатывает условие

        var form = new formidable.IncomingForm();                               // Ловим файл пользователя       
        form.parse(req, function (err, fields, files) {                         // Анализируем файл
          var oldpath = files.fileToUpload.filepath;                            // берем путь куда загрузился файл ( По умолчанию это где-то в глубине папки AppData )
          var newpath = './uploads/' + files.fileToUpload.originalFilename;     // Путь куда нужно будет переместить наш файл
          fs.rename(oldpath, newpath, function (err) {                          // Перемещаем файл 
            if (err) throw err;
            res.write("<h1 style='text-align: center;'>File uploaded!</h1>");   // После завершение возвращаем страницу с успехом 
            res.end();
          });
     });
      } else {     // Стартовая страница для нее подключаем .html

        fs.readFile("./index.html",(err, data)=>
            {
                if(err)throw err.message;
                else res.end(data);             
            });
      }

}).listen(3000);
console.log("Server listening on https://localhost:3000/");