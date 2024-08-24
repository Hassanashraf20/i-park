const express = require ("express")

const {getSlots,getSlot,createSlot,updateSlot,deleteSlot} = require('../controllers/slotController')
const {getSlotValidator,createSlotValidator,updateSlotValidator,deleteSlotValidator} = require('../utils/validator/slotValidator')


//{mergeParams:true} to accses params from other router
const router = express.Router({mergeParams:true})

const authServices=require('../controllers/authController')
router.use(authServices.auth)





router.get("/",authServices.allowedTo('user','admin','manager'),getSlots)
router.get('/:id',authServices.allowedTo('user','admin','manager'),getSlotValidator,getSlot)
router.post("/",authServices.allowedTo('admin','manager'),createSlotValidator,createSlot)
router.put("/:id",authServices.allowedTo('admin','manager'),updateSlotValidator,updateSlot)
router.delete("/:id",authServices.allowedTo('admin','manager'),deleteSlotValidator,deleteSlot)


module.exports = router