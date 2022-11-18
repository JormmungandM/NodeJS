import express from "express"; //подключили пакет с фреймворком
import ejsMate from "ejs-mate";
import path from "path";
import bodyParser from "body-parser";
import cars from "../NodeExam/models/cars.js";


const PORT = process.env.PORT ?? 3000;
const app = express();

const myVolumes = ["<3","3-5","5-7",">7"]
let tempCarsList = cars;
const myUniqueManu = Array.from(cars.reduce((acc,elem)=>acc.add(elem.manufacturer), new Set()));
const myUniqueYear = Array.from(cars.reduce((acc,elem)=>acc.add(elem.year), new Set()));
const myUniqueColor = Array.from(cars.reduce((acc,elem)=>acc.add(elem.color), new Set()));

app.engine("ejs", ejsMate);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render("index.ejs",{
        cars : tempCarsList,
        manufacturers: myUniqueManu,
        years: myUniqueYear.sort().reverse(),
        colors: myUniqueColor,
        volumes: myVolumes,
    })

}).post("/", (req, res) => {
  
  let FilterCarsList = cars;
  const {selectManufacturers,selectYears,selectColors,selectVolumes,
  priceOne,priceTwo} = req.body;


  
  if(!!selectManufacturers)
  {
     FilterCarsList = FilterCarsList.filter(function(car) {
      return car.manufacturer == selectManufacturers;
     })
  }
  if(!!selectYears)
  {
    FilterCarsList = FilterCarsList.filter(function(car) {
      return car.year == selectYears;
     })
  }
  if(!!selectColors)
  {
    FilterCarsList = FilterCarsList.filter(function(car) {     
      return car.color == selectColors;
     })
  }
  if(!!selectVolumes)
  {
    FilterCarsList = FilterCarsList.filter(function(car) {

      switch(selectVolumes)
      {
        case "<3": 
        return car.volume < 3;

        case "3-5":  
        return car.volume >= 3 && car.volume <= 5;

        case "5-7":  
        return car.volume >= 5 && car.volume <= 7;

        case ">7":  
        return car.volume > 7;

        default: break;
      }
     })
  }

  if(priceOne.length != 0 && priceTwo.length != 0 && !!FilterCarsList.length)
  {
    FilterCarsList = FilterCarsList.filter(function(car) {
      return car.price >= priceOne && car.price <= priceTwo;     
     })
  }
    console.log(FilterCarsList);
    tempCarsList = FilterCarsList
    res.redirect("/")
});
  
// Добавление
app.post("/add", (req, res) => {

  const { CarName, CarColor, CarManufacturer, CarYear, CarVolume, CarPrice, CarDescription} = req.body;
    
  if (CarName.length !== 0 || CarColor.length !== 0 || CarManufacturer.length !== 0 || CarYear.length !== 0 || CarVolume.length !== 0 || CarPrice.length !== 0) {
   
    console.log(req.body);

    let biggest;
    if (cars.length !== 0) {
      biggest = cars.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      );
    }
    cars.push({
        id: biggest ? biggest.id + 1 : 1,
        name : CarName, 
        manufacturer: CarManufacturer,
        year: CarYear,
        volume: CarVolume,
        price: CarPrice,
        color: CarColor,
        description: CarDescription,

      });
  }

  res.redirect("/")
});

// Редактирование
app.post("/edit", (req, res) => {
  
  const {id, CarName, CarColor, CarManufacturer, CarYear, CarVolume, CarPrice, CarDescription} = req.body;

  if (CarName.length !== 0 || CarColor.length !== 0 || CarManufacturer.length !== 0 || CarYear.length !== 0 || CarVolume.length !== 0 || CarPrice.length !== 0){ 
    cars.map(el =>{

      if(el.id == id)
      {
        el.name = CarName 
        el.manufacturer = CarManufacturer
        el.year = CarYear
        el.volume = CarVolume
        el.price = CarPrice
        el.color = CarColor
        el.description = CarDescription
      }

      return el;
    })
  }
  res.redirect("/")
});


// Удаление
app.post("/delete", (req, res) => {
  
  const index = cars.findIndex(item => item.id == req.body.id);
  if (index != -1){ 
    cars.splice(index, 1);
  }

  res.redirect("/")
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