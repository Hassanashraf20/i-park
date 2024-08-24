const express = require ("express")


const {getGarages,getGarage,createGarage,updateGarage,deleteGarage}= require('../controllers/garageController')
const {getGarageValidator,createValidator,updateGarageValidator,deleteGarageValidator} = require('../utils/validator/garageValidator')


const router = express.Router()

const authServices=require('../controllers/authController')
router.use(authServices.auth)


const areaRoute =require("./areaRoute")
router.use("/:GarageyId/Area",areaRoute)




router.get("/",authServices.allowedTo('user','admin','manager'),getGarages)
router.post("/",authServices.allowedTo('admin','manager'),createValidator,createGarage)
router.route('/:id').get(authServices.allowedTo('user','admin','manager'),getGarageValidator,getGarage)

router.put("/:id",authServices.allowedTo('admin','manager'),updateGarageValidator,updateGarage)
router.delete("/:id",authServices.allowedTo('admin','manager'),deleteGarageValidator,deleteGarage)


module.exports = router