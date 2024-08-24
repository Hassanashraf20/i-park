const mongoose = require("mongoose")

// create Schema
const carServicesSchema  = new mongoose.Schema({
    name: {
        type:String,
        require:[true,'area is required'],
        minlength:[2,'too short carServices name'],
        maxlength:[40,'too long carServices name']

    },ServicesCost : {
        type:Number,
        require:[true,'Cost for Services is required'],
    },
},{timestamps : true})



//create modle
const carServicesModel = new mongoose.model('carServices',carServicesSchema)

module.exports = carServicesModel