const mongoose = require("mongoose")

// create Schema
const slotSchema  = new mongoose.Schema({
    name: {
        type:String,
        require:[true,'Slot name is required'],
        minlength:[2,'too short Slot name'],
        maxlength:[3,'too long Slot name']

    },
    area : {
        type:mongoose.Schema.ObjectId,
        ref:"Area",
        require:[true,"Slot must be belong to parent Area"]
    },
    isAvailable: {
        type:Boolean ,
        default:true
    },
    isDisabled: {
        type:Boolean ,
        default:false
    },

},{timestamps : true})


slotSchema.pre(/^find/ , function (next){
    this.populate({path:'area' , select:'name garage'})
    next()
})


//create modle
const slotModel = new mongoose.model('Slot',slotSchema)

module.exports = slotModel