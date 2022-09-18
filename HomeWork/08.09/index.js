//1
//В этом модуле есть утилиты для разрешения и синтаксического анализа URL-адресов
var url = require('url');
const UrlObject = new URL("https://ru.wikipedia.org/wiki/URL");//Создаем объект, который принимает на вход ссылку

//Объект имеет такие открытые свойства и методы
//console.log(UrlObject.hash) // Получает и задает часть фрагмента URL-адреса после символа "#" включая этот символ в результат.
//console.log(UrlObject.host) // Получает и задает имя хоста URL-адреса.
//console.log(UrlObject.hostname) //Получает и задает часть имени узла URL-адреса. Отличие от .host в том, что .hostname не включает порт
//console.log(UrlObject.href) // Получает и задает весь URL-адрес, получение эквивалентно вызову UrlObject.toString().
//console.log(UrlObject.origin) // Получает доступную только для чтения сериализацию источника URL-адреса.
//console.log(UrlObject.password) // Получает и задает часть URL-адреса, содержащую пароль.
//console.log(UrlObject.port) //Получает и задает часть URL-адреса, относящуюся к порту. Значение порта может быть числом или строкой, содержащей число в диапазоне от 0 до 65535 (включительно)
//console.log(UrlObject.pathname) //Получает и задает часть пути URL-адреса,после имени узла.
//console.log(UrlObject.protocol) // Получает и задает протокольную часть URL-адреса. Поменяет или задаст часть только если введенная строка подходит по Стандартам URL
//console.log(UrlObject.search) //Получает и задает часть запроса URL-адреса, после ? (включительно)
//console.log(UrlObject.username) //Получает и задает часть имени пользователя URL-адреса.
//console.log(UrlObject.toString()) //Метод toString() объекта URL возвращает сериализованный URL, эквивалентно значению UrlObject.href и UrlObject.toJSON().
//console.log(UrlObject.toJSON()) //Метод toJSON() объекта URL возвращает сериализованный URL, эквивалентно значению UrlObject.href и UrlObject.toString().




//2

//Создаем класс File
class File {

    fs = require('fs'); //модуль для работы с файловой системой
    user_path; //путь пользователя
    filesName; //строка для хранение имен файлов и папок

    constructor(_path)
    {
        this.user_path = _path;
    }

    Files(dir = this.user_path)
    {    
          var files = this.fs.readdirSync(dir);//Метод который читает содержимое каталога

          //цикл для перебора файлов и папок
          for (var i in files)
          {
              var name = dir + '\\' + files[i]; //Создаю путь, для дальнейшей проверки на наличие папок
             
              if (this.fs.statSync(name).isDirectory()) //Проверка на наличие подпапок если есть то переходим в нее и работаем с ней
              {
                this.filesName +=  "\nFolder:" + files[i] + "\n"; //Добавил обозначение для папок, чтобы было понятнее где папка, а где файл
                this.Files(name);//Вызываем метод и передаем новый путь 
              }
              else
              {
                this.filesName += "   " + files[i] + "\n"; //Добавляем название файла в строку
              }
          }
          return this.filesName; //Возвращаем имена файлов
    }
    
}

const show = new File("C:\\Users\\JormmungandPC\\Videos");//Создаем объект 
console.log(show.Files());//Вызываем метод
