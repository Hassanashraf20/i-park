const mongoose = require("mongoose")

// create Schema
const areaSchema  = new mongoose.Schema({
    name: {
        type:String,
        require:[true,'area is required'],
        minlength:[2,'too short area name'],
        maxlength:[10,'too long area name']

    },
    garage : {
        type:mongoose.Schema.ObjectId,
        ref:"Garage",
        require:[true,"Area must be belong to parent Garage"]
    },

},{timestamps : true})

areaSchema.pre(/^find/ , function (next){
    this.populate({path:'garage' , select:'name -_id'})
    next()
})



//create modle
const areaModel = new mongoose.model('Area',areaSchema)

module.exports = areaModel