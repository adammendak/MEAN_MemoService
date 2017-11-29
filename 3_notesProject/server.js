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
    res.render("home")
})





const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})