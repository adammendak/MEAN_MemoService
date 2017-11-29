const express = require('express');
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express();

const urlencodeParser = bodyParser.urlencoded({
    extended: false
})

const jsonParser = bodyParser.json();


app.engine("hbs", hbs({
    extname:"hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/"
}));
app.set("view engine", "hbs");

//############# MIDDLEWARE ###################
app.use("/css", express.static(__dirname + "/public/css"))
app.use("/", (req,res,next)=> {
    console.log("someone entered the site from " + req.url)
    res.cookie("cookieName", "cookieValue")

    next()
})


//########### GET ###################//
app.get("/", (req,res) => {
    res.send(`
        <html> 
            <head>
                <link type="text/css" rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <h1> lol express</h1>
            </body>
        </html> 
    `)
})

app.get("/user", (req, res) => {
    res.render("user", {
        title: "user profile",
        name: "Adam",
        lastName: "Mendak",
        valid: false,
        pets: ["dog", "cat"], 
        parents:[
            {dad:"Adam", mother:"Urszula"}
        ]
    })
})

app.get("/api/user", (req,res) => {
    res.send({
        name: "Adam", 
        lastName: "Mendak"
    })
})

app.get("/api/user/:id", (req,res) => {
    let id = req.params.id;
    
    res.send(`  
    <html> 
        <body>
            <h1> wecome user numer ${id}</h1>
        </body>
    </html> 
    `)
})

app.get("/newUser", (req,res) => {
    res.render("newUser")
})

app.get("/newUserAjax", (req,res) => {
    res.render("newUserAjax")
})

//############### POST ####################//

app.post("/newUser", urlencodeParser, (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    console.log("first Name " + firstName + " lastName " + lastName)
})

app.post("/newUserAjax", jsonParser, (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    console.log("first Name " + firstName + " lastName " + lastName)
})



const port = process.env.port || 3000;
app.listen(port)