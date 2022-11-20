import { Router } from "express";
import { PrintAll, AddCar, EditCar, DeleteCar } from "../controllers/car_controllers.js"; 


const router_cars = Router();

let tempCarsList = [];


router_cars
  .route("/")
  .get(PrintAll, (req, res) => {
    if(tempCarsList.length == 0)
    {
      tempCarsList = req.cars;
    }
    const myVolumes = ["<3","3-5","5-7",">7"]
    const myUniqueManu = Array.from((req.cars).reduce((acc,elem)=>acc.add(elem.manufacturer), new Set()));
    const myUniqueYear = Array.from((req.cars).reduce((acc,elem)=>acc.add(elem.year), new Set()));
    const myUniqueColor = Array.from((req.cars).reduce((acc,elem)=>acc.add(elem.color), new Set()));

    res.render("index.ejs",{     
        cars : tempCarsList,
        manufacturers: myUniqueManu,
        years: myUniqueYear.sort().reverse(),
        colors: myUniqueColor,
        volumes: myVolumes,
    })
  })
  .post(PrintAll, (req, res) => {
  
  let FilterCarsList = req.cars;
  const {selectManufacturers,selectYears,selectColors,selectVolumes,
  priceOne,priceTwo} = req.body; 
  console.log(req.body);
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
    
    tempCarsList = FilterCarsList
    res.redirect("/")
});
  
// Добавление
router_cars
  .route("/add")
  .post(AddCar, (req, res) => {
    tempCarsList = [];
    res.redirect("/")
  });
  
  // Редактирование
  router_cars
  .route("/edit")
  .post(EditCar,(req, res) => { 
    tempCarsList = [];
    res.redirect("/")
  });

  // Удаление
  router_cars
  .route("/delete")
  .post(DeleteCar, (req, res) => {
    tempCarsList = [];
    res.redirect("/")
  });



export default router_cars;
