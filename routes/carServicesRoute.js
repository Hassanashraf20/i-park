const express = require ("express")




const {getCarServiceses,getCarService,createCarServices,updateCarServices,deleteCarServices} = require('../controllers/carServicesController')

const router = express.Router()

const authServices=require('../controllers/authController')
router.use(authServices.auth)



router.get("/",authServices.allowedTo('user','admin','manager'),getCarServiceses)
router.get('/:id',authServices.allowedTo('user','admin','manager'),getCarService)
router.post("/",authServices.allowedTo('admin','manager'),createCarServices)
router.put("/:id",authServices.allowedTo('admin','manager'),updateCarServices)
router.delete("/:id",authServices.allowedTo('admin','manager'),deleteCarServices)


module.exports = router