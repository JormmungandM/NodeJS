// 1. Ознайомтесь з props та methods
// setDefaultEncoding
// writableLength
// writableCorked
// writableEnded
// destroyed
// Використати їх у коді для роботи з WritableStream

const fs = require('fs');                       // модуль для работы с файлами
const path = "../18.09/temp.txt";               // путь к файлу
const writable = fs.createWriteStream(path);    // создаем пишущий поток

writable.setDefaultEncoding("utf8");    // setDefaultEncoding() используется для сброса кодировки по умолчанию для записываемого потока
console.log(writable.writableLength);   // writableLength - Это свойство содержит количество байтов (или объектов) в очереди, готовых к записи.
console.log(writable.writableCorked);   // writableCorked - Это свойство содержит количество раз writable.uncork() необходимо вызвать, чтобы полностью откупорить поток 
console.log(writable.writableEnded);    // writableEnded - Это свойство содержит правду после writable.end(), иначе false.
console.log(writable.destroyed);        // destroyed - Это свойство содержит истину после вызова writable.destroy(), иначе false.


// 3. Напишіть функцію яка приймає рядки та буфер і записує їх в потік виводу в консоль за допомогою методу write.

// Функция принимает строку и буфер, и выводит их в консоль
var ConsoleWrite = (str = "\0",buff = "\0") => {process.stdout.write(str + buff.toString())};


const buff = Buffer.alloc(1024);    // Создаем буфер размером на 1024 символа
buff.write("some buffer");          // Добавляем текст 
ConsoleWrite("some string", buff);  // Вызываем нашу функцию и передаем ей данные




