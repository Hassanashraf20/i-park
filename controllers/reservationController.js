const apiError = require('../utils/apiErorr')
const asyncHandler = require('express-async-handler')
const factoryHandler=require("./handlerFactory")


const Reservation = require('../models/ReservationTicket')
const Slot = require('../models/slot')



// @desc    Create a new reservation
// @route   POST /api/Reservations
// @access  auth/User

exports.createReservation = async (req, res, next) => {
    try {
        //const userId = {user:req.user._id};
        const {slotId, reservationTime, duration } = req.body
        
        const expireAt = new Date(new Date(reservationTime).getTime() + duration * 60000) // duration is in minutes
        const totalReserve = 20 * duration
        const soltAvailable = await Slot.findById(slotId)

        if(soltAvailable.isAvailable === true){
            const reservation = await Reservation.create({
                slotId,
                userId:req.user._id,
                reservationTime,
                expireAt,
                totalReservationPrice : totalReserve ,
                isPaid : false,
                paidAt: Date.now(),
                paymentMethod:'cash'
            })
    
            //await reservation.save()
            
            // Mark slot as reserved
            await Slot.findByIdAndUpdate(slotId, { isAvailable: false })
            
            res.status(201).json({ success: true, data: reservation })
        }else{
            return next(new apiError(`this slot is Unavilable: ${slotId}`,404))
        }
    }catch (error) {
            res.status(500).json({ success: false, message: error.message })
        } 
        

}



// Clean up expired reservations and make slots available again
exports.cleanUpExpiredReservations =asyncHandler(async (req, res, next) => {
    try {
        const expiredReservations = await Reservation.find({ expiresAt: { $lte: new Date() }, isExpire: false });

        for (const reservation of expiredReservations) {
            // Mark reservation as expired
            reservation.isExpire = true;
            await reservation.save();

            // Make slot available again
            await Slot.findByIdAndUpdate(reservation.slotId, { isAvailable: true });
        }
    } catch (error) {
        console.error('Error cleaning up expired reservations:', error.message);
    }

    next()
});




// limit user to get his order only
exports.HistoryReservationForLoggedUser = asyncHandler(async (req, res, next) =>{
    if(req.user.role === 'user') {
        req.filterObj = { userId: req.user._id }
    }
    next()
})




// @desc    Get all reservation
// @route   Get /api/Reservations
// @access  auth/User-Admin-Manager
exports.getAllReservations = factoryHandler.getAll(Reservation)

// @desc    Get Specific order
// @route   Get /api/Reservations/:id
// @access  auth/User-Admin-Manager
exports.findSpecificReservations = factoryHandler.getOne(Reservation)

// @desc    Update reservations paid status to paid
// @route   PUT /api/Reservations/:id/pay
// @access  auth/Admin-Manager
exports.updateReservationToPaid = asyncHandler(async (req, res, next) =>{
    const reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
        return next(new apiError(`There is no such a reservation with this id:${req.params.id}`,404))
    }

    reservation.isPaid = true
    reservation.paidAt = Date.now()

   await reservation.save()

    res.status(200).json({status:'success' , data: reservation })
})



// @desc    Update reservations expire status to expired
// @route   PUT /api/Reservations/:id/expire
// @access  auth/Admin-Manager
exports.updateReservationToExpire = asyncHandler(async (req, res, next) =>{
    const reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
        return next(new apiError(`There is no such a reservation with this id:${req.params.id}`,404))
    }

    reservation.isExpire = true
    reservation.expireAt = Date.now()

   // updatedReservation 
   await reservation.save()
   await Slot.findByIdAndUpdate(reservation.slotId, { isAvailable: true });

    res.status(200).json({status:'success' , data: reservation })
})

// @desc    Cancel Reservation
// @route   Delete /api/Reservations
// @access  auth/User-Admin-Manager
exports.deleteReservation= asyncHandler(async (req,res,next)=>{
        const reservation = await Reservation.findOneAndDelete({userId: req.user._id})
        if(!reservation){
            return next(new apiError(`reservation not found for this: ${id}`,404))
        }

        await Slot.findByIdAndUpdate(reservation.slotId, { isAvailable: true });

        res.status(204).send()//.sendStatus(204).send('reservation has been deleted')
    })



// @desc    Cancel Reservation
// @route   Delete /api/Reservations
// @access  auth/-Admin-Manager
exports.deleteReservationForAdmin=factoryHandler.deleteOne(Reservation)






