import express from "express"; //подключили пакет с фреймворком
import ejsMate from "ejs-mate";
import path from "path";
import cars from "../NodeExam/models/cars.js";
//import cars from "./models/cars";

const PORT = process.env.PORT ?? 3000;
const app = express();

const myVolumes = ["2-3","4-5","6-7",">7"]

const myUniqueManu = Array.from(cars.reduce((acc,elem)=>acc.add(elem.manufacturer), new Set()));
const myUniqueYear = Array.from(cars.reduce((acc,elem)=>acc.add(elem.year), new Set()));
const myUniqueColor = Array.from(cars.reduce((acc,elem)=>acc.add(elem.color), new Set()));
console.log(myUniqueYear)

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.get('/', function(req, res) {

    res.render("index.ejs",{
        cars : cars,
        manufacturers: myUniqueManu,
        years: myUniqueYear.sort().reverse(),
        colors: myUniqueColor,
        volumes: myVolumes,
    })

  });
  


app.listen(PORT, () => {
  console.log(`Server has been started http//localhost:${PORT}`);
});

function unique(arr) {
    let result = [];
  
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
  
    return result;
  }