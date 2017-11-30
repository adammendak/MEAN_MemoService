const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/App');

const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    avail: Boolean
});

const Car = mongoose.model('Car', carSchema);

const addCar = new Car({
    brand:"ford",
    model:"focus",
    year:2121,
    avail: true
})
//  SAVE
// addCar.save((err,doc)=> {
//     if(err)
//         return console.log(`err is ${err}`)
//     console.log(doc)
// })
//
// Car.findOne({year:2000}, (err,doc) => {
//     if(err) {
//         console.log(`error occured ${err}`)
//     }
//     console.log(doc)
// })
//
// Car.findById("5a204c9f6df35956435c37a2", (err,doc)=> {
//     if(err) {
//         return console.log("error");
//     }
//
//     console.log(doc)
// })
//
// Car.findByIdAndRemove("5a204c9f6df35956435c37a2", (err,doc) => {
//     if(err) {
//         console.log("error")
//     }
//
//     console.log("deleted " + doc)
// })
//
// Car.remove({brand:"Ford"}, (err,doc) => {
//     if (err) {
//         console.log("err")
//     }
//
//     console.log("deleted fords")
// })
//
// Car.update({_id:"5a204dd5c693e5565c313bd8"}, {
//     $set: {
//         year: 123
//     }
// },(err,doc) => {
//         if(err) return console.log("error")
//
//     console.log(doc)
// })

Car.findByIdAndUpdate("5a204dd5c693e5565c313bd8", {
    $set: {
        model: "ferrari"
    }
}, (err,doc) => {
    if(err) return console.log("error")

    console.log(doc)
})