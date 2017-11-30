const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const app = express();

//################ HBS ####################
app.engine("hbs", hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))

app.set("view engine", "hbs")

//################ MIDDLEWARE ##################
app.use("/CSS", express.static(`${__dirname}/public/css`))
const jsonParser = bodyParser.json();

//################ GET ########################
app.get("/", (req,res) => {

    fetch('http://localhost:3004/messages')
    .then((response) => {
        response.json().then(json => {
            res.render("home")
        })
    })
    .catch(error => {
        console.log(error)
    })

})  

app.get("/add_note", (req,res) => {
    res.render("add_note")
})



// ################### POST #####################
app.post("/api/add_note", jsonParser, (req,res) => {
    
        fetch(('http://localhost:3004/messages'),{
            method : "POST",
            body : JSON.stringify(req.body),
            Headers:{
                "Content-Type":"application/json"     
            }.then((response)=> {
                res.status(200).send()
            })
        })
        console.log(req.body)
    })




const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})