const mongoose = require("mongoose")
// create Schema
const Garageschema = new mongoose.Schema({
    name: {
        type:String,
        require:[true,'Garage is required'],
        unique:[true,'Garage must be unique'],
        minlength:[3,'too short Garage name'],
        maxlength:[30,'too long Garage name']

    },
    capacity: {type:Number,
        require:[true,'Garage capacity is required'],
    },
    freeArea:Number ,
    reserverdArea:Number,

},{timestamps:true})


//create modle
const Garagemodel = new mongoose.model("Garage",Garageschema)

module.exports = Garagemodel