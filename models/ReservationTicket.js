const mongoose= require("mongoose")

const reservationSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required: [true, 'Reservation must be belong to user'],
    },
    slotId:{
        type:mongoose.Schema.ObjectId,
        ref:'Slot',
        required: [true, 'Reservation must be belong to Slot'],
    },
    reservationTime:{
        type:Date,
        //require:true ,
        default:Date.now(),
    },
    // slotReservationPrice:{
    //     type:Number,
    //     default:20,
    // },

    totalReservationPrice:Number,

    paymentMethod:{
        type:String,
        enum:['cash','card'],
        default:'cash',
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    paidAt:Date,

    isExpire:{
        type:Boolean,
        default:false,
    },
    expireAt:{
        type:Date,
        require:true
    },

},{timestamps:true})

// reservationSchema.index({expireAt: 1 },{expireAfterSeconds:0 })

reservationSchema.pre(/^find/ , function (next){
    this.populate({path:'userId' , select:'name carModel'})
//.this.populate({path:'cartItems.product' , select:'title imageCover'})
    next()
})

reservationSchema.pre(/^find/ , function (next){
this.populate({path:'slotId' , select:'name area'})
    next()
})

//create modle
const ReservationModel = new mongoose.model('Reservation',reservationSchema)

module.exports = ReservationModel
