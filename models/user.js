const mongoose= require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user name is required '],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email must be unique'],
    },
    password:{
        type:String,
        minlength:[6,'too short password'],
    },
    
    passwordChangedAt:Date,
    passwordResetCode:String,
    passwordResetExpires:Date,
    passwordResetVerified:Boolean,


    phone:{
        type:String
    },
    role:{
        type:String,
        enum:['user','manager','admin'],
        default:'user',
    },
    // child reference (one to many)
    // wishList:[{
    //     type:mongoose.Schema.ObjectId,
    //     ref:'productModel'
    // }]
    addresses:{
        type:String,
    },
    carModel:{
        type:String,
        require:[true,'carModel is required for carServices'],
    },

},{timestamps:true})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12)
    next()
  })







const userModel = new mongoose.model('User',userSchema)

module.exports=userModel