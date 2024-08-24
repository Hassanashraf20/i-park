const asyncHandler = require('express-async-handler')
const apiError = require('../utils/apiErorr')


//Factory:deleteOne
exports.deleteOne=(Model)=>
asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const document = await Model.findByIdAndDelete(id)
    if(!document){
        return next(new apiError(`document not found for this: ${id}`,404))
    }
    // // Trigger "remove" event to Mongoose middleware."remove" to do aggregation when remove
    // document.remove()

    res.status(204).send()//.sendStatus(204).send('document has been deleted')
})

//Factory:updateOne
exports.updateOne=(Model)=>asyncHandler(async(req,res,next)=>{
    const document=await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    )
    if(!document){
        return next(new apiError(`document not found for this: ${req.params.id}`,404))
    }

    // Trigger "save" event to Mongoose middleware."save" to do aggregation when save
    document.save()

    res.status(200).json({data:document})
})

//Factory:createOne
exports.createOne=(Model)=>asyncHandler(async(req,res)=>{
    const newdocument =await Model.create(req.body)
    res.status(200).json({data:newdocument})
})

//Factory:getOne
exports.getOne=(Model,populatationOpt)=>asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    //Build query
    let query = Model.findById(id)
    if(populatationOpt){
     query = query.populate(populatationOpt)
    }
    //Execute query
    const document = await query

    if(!document){
        return next(new apiError(`document not found for this: ${req.params.id}`,404))
    }
    res.status(200).json({data:document})
})

//Factory:getAll
exports.getAll=(Model)=>asyncHandler(async(req,res)=>{
    let filter = {}
    if (req.filterObj) {
        filter = req.filterObj
    }
    const documents = await Model.find((filter),req.query)

    if(!documents){
        return next(new apiError(`documents not found for this: ${Model}`,404))
    }
  

    res.status(200).json({result:documents.length, data:documents})
})
