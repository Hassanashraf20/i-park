const asyncHandler = require('express-async-handler')
const Slot = require("../models/slot")
const factoryHandler=require("./handlerFactory")



//GET    api/Area/AreaId/Slot" -> nested route
//@desc Get list of Slots
//@route GET api/Slot
//@accses privte
exports.getSlots = asyncHandler( async (req,res)=>{

let filterObj={}
if(req.params.AreaId) filterObj = { area : req.params.AreaId} 

const Slots = await Slot.find(filterObj)
//.populate({path:"Garage",Select:"name"})
res.status(200).json({result:Slots.length , data:Slots})

})




//@desc Get Spacific Slot
//@route GET api/Slot/:id
//@accses privte
exports.getSlot=factoryHandler.getOne(Slot)


//@desc createSlot
//@route POST api/Slot
//@accses privte/admin-manager
exports.createSlot=factoryHandler.createOne(Slot)

//@desc UpdateSlot
//@route PUT api/Slot/:id
//@accses privte/admin-manager
exports.updateSlot=factoryHandler.updateOne(Slot)



//@desc DeleteSlot
//@route DELETE api/Slot/:id
//@accses privte/admin-manager
exports.deleteSlot=factoryHandler.deleteOne(Slot)


