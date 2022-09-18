// 2. Попрацювати з документацією https://nodejs.org/api/buffer.html. 
// Імпортувати Buffer та виконати будь-які 5 методів з документаціі. 
// Прокоментувати їх


const buf = Buffer.from('this is a buffer');  // создаем буфер со строкой 'this is a buffer'
const buf2 = Buffer.from('this is a second buffer'); // создаем буфер со строкой 'this is a second buffer'

// Вывожу результаты методов 

console.log(               // Метод indexOf() проверяет наличие заданного значения в буфере и возвращает позицию
    buf.indexOf('is'));    // Этот метод возвращает -1, если искомое значение никогда не встречается

console.log(                      // Метод slice() возвращает новый объект буфера, используя части уже существующего буфера
    buf.slice(0,5).toString());   // Параметры указывают на начало и конец среза

console.log (
    Buffer.isBuffer(buf));  // Метод Buffer.isBuffer() возвращает значение true, если передаваемый объект является буфером иначе false

console.log (
    buf.equals(buf2));  // Метод equals() сравнивает два буферных объекта и возвращает true, если они равны, иначе false

console.log (
    buf.includes('buffer'));  // Метод include() проверяет, включено ли указанное значение в буфер. true, если значения включены, иначе false



// 3. https://nodejs.org/api/stream.html попрацювати з документацією про streams. 
// Виконати будь-які 5 методів та прокоментувати їх

const fs = require('fs');                       // модуль для работы с файлами
const path = "temp.txt";                        // путь к моему файлу
var readable  = fs.createReadStream(path);      // создаем читающий поток
const writable = fs.createWriteStream(path);    // создаем пишущий поток

readable.setEncoding('utf8')      // Метод setEncoding() устанавливает кодировку символов читаемого потока
readable.pipe(writable);          // Метод pipe() превращает поток для чтения в указанный поток для записи (writable)

readable.on("data", (chunk) => 
{
    readable.pause()                  // Метод pause() приостанавливает читаемый поток
    console.log(readable.isPaused())  // Метод isPaused() возвращает значение true, если состояние доступного для чтения потока приостановлено, иначе false.    
    readable.resume()                 // Метод resume() возобновляет приостановленный поток
    readable.unpipe()                 // Метод unpipe() прекращает превращать доступный для чтения поток в доступный для записи поток, вызванный методом pipe().

})