const http = require("http");
const fs = require("fs");
const url = require("url");
const PORT=3000;
const server = http.createServer();


server.on("request",(req,res)=>{
    console.log("Request...");
    const myURl= url.parse(req.url).pathname;
    switch(myURl){
        case '/':
            fs.readFile("../views/index.html",(err, data)=>
            {
                if(err)throw err.message;
                else res.end(data);
            })
            break;
        case '/create':
            const query = url.parse(req.url, true).query;
            console.log(`Login ${query.login}. Password ${query.password}`)
            res.end("<h1 style='text-align: center;'>Success</h1>"); 
            break;            
    }
    res.end;
});
server.listen(PORT,()=>
    console.log(`Server has been started ${PORT}`)

)