const {check } = require('express-validator')
const validaterMiddliware=require('../../middlewares/validatorMidlleware')
const userModel = require('../../models/user')




exports.signUpValidator=[
    check("name").notEmpty().withMessage("User name is required"),

    check('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email')
    .custom((val)=>
    userModel.findOne({email:val}).then((user)=>{
        if(user){
            return Promise.reject(new Error('e-mail alaredy in used'))
        }
    })
    ),

    check('password').notEmpty().withMessage('password is required')
    .isLength({min:6}).withMessage("password must be at least 6 Characters")
    .custom((password,{req})=>{
        if(password!=req.body.passwordConfirm){
            throw new Error('passwordConfirm incorrect')
        }
        return true
    }),

    check('passwordConfirm').notEmpty().withMessage('passwordConfirm is required'),

    validaterMiddliware,
]



exports.loginValidator=[
    check('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email')
    .custom((val)=>
        userModel.findOne({email:val}).then((user)=>{
            if(!user){
                return Promise.reject(new Error('e-mail is not found'))
            }
        })
        ),
    check('password').notEmpty().withMessage('password is required')
    .isLength({min:6}).withMessage("password must be at least 6 Characters"),


    validaterMiddliware,
]









