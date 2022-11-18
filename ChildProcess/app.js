import express from "express"; 
import {fork} from "child_process"

const app = express();

app.get("/:value", (req,res) =>{
     const value = req.params.value;

     const child = fork("child.js");
     child.send(value)

     child.on("message", (message)=>{
        console.log(message);
        res.json(message);
     })

     child.on("exit", (code)=>{
        console.log(code);
     })
})

app.listen(3000, () => {
    console.log(`Server has been started http//localhost:3000`);
  });


