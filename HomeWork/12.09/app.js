const http = require('http');
const url = require('url')
const EventEmitter = require("events");
const event = new EventEmitter();
const PORT = 3000;

function myListener(data)
{
    console.log(data);
}

event.on("request", myListener);
event.addListener("response", myListener);

function homepage(req, res)
{
    res.write("<div>")  
    res.write("<a href='http://localhost:3000'>Main</a>");   
    res.write("<a href='http://localhost:3000/about'>About</a>");
    res.write("<a href='http://localhost:3000/contact'>Contacts</a>");
    res.write("</div>")
    res.write("<h1>Main</h1>")
}
function about(req, res)
{
    res.write("<div>") 
    res.write("<a href='http://localhost:3000'>Main</a>");
    res.write("<a href='http://localhost:3000/about'>About</a>");
    res.write("<a href='http://localhost:3000/contact'>Contacts</a>");
    res.write("</div>")
    res.write("<h1>About</h1>")
}
function contact(req, res)
{
    res.write("<div>") 
    res.write("<a href='http://localhost:3000'>Main</a>");
    res.write("<a href='http://localhost:3000/about'>About</a>");
    res.write("<a href='http://localhost:3000/contact'>Contacts</a>");
    res.write("</div>")
    res.write("<h1>Contacts</h1>")
}
function page404(req, res)
{
    res.write("<h2 style='text-align: center; margin-top:100px; font-size:100px'>Not Found 404</h2>");
    res.write("<a style='margin-left:49%; font-size:50px' href='http://localhost:3000'>Main</a>");

}


http.createServer((request,response) => {

    response.setHeader("Content-Type", "text/html; charset=utf-8; "); 
    response.write("<style> a{ font-size:25px; text-decoration: none; margin:20px; color:black; caret-color: transparent;}  a:hover{border-bottom: 1px solid;} div{margin-top:20px; text-align: center;} h1{text-align: center; font-size:50px} </style>"); 
    
    let urlPart = url.parse(request.url);
    event.emit("request","request.url");
    console.log(urlPart.pathname)

    switch(urlPart.pathname)
    {
        case "/":
            homepage(request,response)
            break;
        case "/about":
            about(request,response)
            break;
        case "/contact":
            contact(request,response) 
            break;
        default:
            page404(request,response)   
            break;    
    }  
    event.emit("response","response.end")
    response.end()
}).listen(PORT, () => {
    console.log('Server has been started');

})