// модуль с погодой, погоду берет с сайта weather.service.msn.com
// https://www.npmjs.com/package/weather-js
const weather = require('weather-js');


function weatherToday() {

    // Город который ввел пользователь 
    let UserIn = document.getElementById("UserIn").value;

    let p = document.getElementById("pWeather");

    // Функция поиска погоды, мы должны указать название города и единицу градусов (с 'C' отказывался работать, хотя автор уверяет в обратном)
    weather.find({search: UserIn, degreeType: 'F'}, function(err, result) {  
      
      if(err) { // Если возникла ошибка
        p.innerHTML = "City not found"
      }

      // Выводим все имеющеюся данные о погоде.
      p.innerHTML = "low: " + result[0]['forecast'][0].low + "<br\>high: " + result[0]['forecast'][0].high
      + "<br\>sky code day: " + result[0]['forecast'][0].skycodeday
      + "<br\>sky text day: " + result[0]['forecast'][0].skytextday
      + "<br\>date: " + result[0]['forecast'][0].date
      + "<br\>day: " + result[0]['forecast'][0].day
      + "<br\>short day: " + result[0]['forecast'][0].shortday
      + "<br\>precip: " + result[0]['forecast'][0].precip
    });
}
document.getElementById("submit").onclick = weatherToday;