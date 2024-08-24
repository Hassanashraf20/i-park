const {check,body } = require('express-validator')
const validaterMiddliware=require('../../middlewares/validatorMidlleware')


const Area = require('../../models/area')



exports.getSlotValidator=[
    check('id').isMongoId().withMessage('invalid Slot id'),
    validaterMiddliware,


]

exports.createSlotValidator=[
    check("name").notEmpty().withMessage("Slot is required")
    .isLength({min:2}).withMessage("too short Slot name")
    .isLength({max:3}).withMessage("too long Slot name"),

    check('area').notEmpty().withMessage("Slot must be belong to a Area")
    .isMongoId().withMessage('invalid Area id')
    .custom((AreaId) => 
        Area.findById(AreaId).then((Area)=>{
          if (!Area) {
              return Promise.reject(
                new Error(`no Area for this Id: ${AreaId}` )
            )
          }
        })
      ),
    validaterMiddliware,
]

exports.updateSlotValidator=[
    check('id').isMongoId().withMessage('invalid Slot id'),
    body('name').optional(),
    body('area').optional().isMongoId(),
    validaterMiddliware,

]

exports.deleteSlotValidator=[
    check('id').isMongoId().withMessage('invalid Slot id'),
    validaterMiddliware,


]