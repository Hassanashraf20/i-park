const Garage = require("../models/garages")
const factoryHandler=require("./handlerFactory")





//@desc Get list of Garages
//@route GET api/Garage
//@accses privte
exports.getGarages=factoryHandler.getAll(Garage)

//@desc Get Spacific Garage
//@route GET api/Garage/:id
//@accses privte
exports.getGarage=factoryHandler.getOne(Garage)


//@desc createGarage
//@route POST api/Garage
//@accses privte/admin-manager
exports.createGarage=factoryHandler.createOne(Garage)

//@desc UpdateGarage
//@route PUT api/Garage/:id
//@accses privte/admin-manager
exports.updateGarage=factoryHandler.updateOne(Garage)



//@desc DeleteGarage
//@route DELETE api/Garage/:id
//@accses privte/admin-manager
exports.deleteGarage=factoryHandler.deleteOne(Garage)




