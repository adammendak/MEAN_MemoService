const express = require('express');

const app = express();

app.use("/css", express.static(__dirname + "/public/css"))

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

app.get("/api/user", (req,res) => {
    res.send({
        name: "Adam", 
        lastname: "Mendak"
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