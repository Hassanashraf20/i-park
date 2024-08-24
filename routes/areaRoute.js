const express = require ("express")


const {getAreas,getArea,createArea,updateArea,deleteArea} = require('../controllers/areaController')

//{mergeParams:true} to accses params from other router
const router = express.Router({mergeParams:true})


const authServices=require('../controllers/authController')
router.use(authServices.auth)



const slotRoute = require('./slotRoute')
router.use("/:AreaId/Slot",slotRoute)




router.get("/",authServices.allowedTo('user','admin','manager'),getAreas)
router.get('/:id',authServices.allowedTo('user','admin','manager'),getArea)
router.post("/",authServices.allowedTo('admin','manager'),createArea)
router.put("/:id",authServices.allowedTo('admin','manager'),updateArea)
router.delete("/:id",authServices.allowedTo('admin','manager'),deleteArea)


module.exports = router