const asyncHandler = require('express-async-handler')
const Area = require("../models/area")
const factoryHandler=require("./handlerFactory")



//GET    api/Garage/GarageyId/Area" -> nested route
//@desc Get list of Areas
//@route GET api/Area
//@accses privte
exports.getAreas = asyncHandler( async (req,res)=>{

let filterObj={}
if(req.params.GarageyId) filterObj = { garage : req.params.GarageyId} 

const Areas = await Area.find(filterObj)
//.populate({path:"Garage",Select:"name"})
res.status(200).json({result:Areas.length , data:Areas})

})




//@desc Get Spacific Area
//@route GET api/Area/:id
//@accses privte
exports.getArea=factoryHandler.getOne(Area)


//@desc createArea
//@route POST api/Area
//@accses privte/admin-manager
exports.createArea=factoryHandler.createOne(Area)

//@desc UpdateArea
//@route PUT api/Area/:id
//@accses privte/admin-manager
exports.updateArea=factoryHandler.updateOne(Area)



//@desc DeleteArea
//@route DELETE api/Area/:id
//@accses privte/admin-manager
exports.deleteArea=factoryHandler.deleteOne(Area)


