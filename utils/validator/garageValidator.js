const {check,body } = require('express-validator')
const validaterMiddliware=require('../../middlewares/validatorMidlleware')


exports.getGarageValidator=[
    check('id').isMongoId().withMessage('invalid Garage id'),
    validaterMiddliware,


]

exports.createValidator=[
    check("name").notEmpty().withMessage("Garage is required")
    .isLength({min:3}).withMessage("too short Garage name")
    .isLength({max:30}).withMessage("too long Garage name"),
    body('capacity').notEmpty(),
    validaterMiddliware,
]

exports.updateGarageValidator=[
    check('id').isMongoId().withMessage('invalid Garage id'),
    body('name').optional(),
    body('capacity').optional().isNumeric(),
    validaterMiddliware,

]

exports.deleteGarageValidator=[
    check('id').isMongoId().withMessage('invalid Garage id'),
    validaterMiddliware,


]