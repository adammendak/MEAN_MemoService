const express = require('express');
const hbs = require('express-handlebars')
const app = express();

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
        lastName: "Mendak"
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


const port = process.env.port || 3000;
app.listen(port)