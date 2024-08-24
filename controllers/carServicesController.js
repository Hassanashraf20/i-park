const carServices = require("../models/carServices")
const factoryHandler=require("./handlerFactory")



//@desc Get list of carServiceses
//@route GET api/carServices
//@accses privte
exports.getCarServiceses=factoryHandler.getAll(carServices)



//@desc Get Spacific carServices
//@route GET api/carServices/:id
//@accses privte
exports.getCarService=factoryHandler.getOne(carServices)


//@desc createcarServices
//@route POST api/carServices
//@accses privte/admin-manager
exports.createCarServices=factoryHandler.createOne(carServices)

//@desc UpdatecarServices
//@route PUT api/carServices/:id
//@accses privte/admin-manager
exports.updateCarServices=factoryHandler.updateOne(carServices)



//@desc DeletecarServices
//@route DELETE api/carServices/:id
//@accses privte/admin-manager
exports.deleteCarServices=factoryHandler.deleteOne(carServices)


