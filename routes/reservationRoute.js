const express = require ("express")

const {
    createReservation,
    cleanUpExpiredReservations,
    HistoryReservationForLoggedUser,
    getAllReservations,
    findSpecificReservations,
    updateReservationToPaid,
    updateReservationToExpire,
    deleteReservationForAdmin,
    deleteReservation
} = require('../controllers/reservationController')

const router = express.Router()

const authServices=require('../controllers/authController')
router.use(authServices.auth)



//For user Only
//router.get('/',authServices.allowedTo('user'),HistoryReservationForLoggedUser,getAllReservations)
router.post("/",authServices.allowedTo('user'),cleanUpExpiredReservations,createReservation)
router.delete("/:id/admin",authServices.allowedTo('admin','manager'),deleteReservationForAdmin)
router.delete("/:id",authServices.allowedTo('user'),HistoryReservationForLoggedUser,deleteReservation)//Cancel Reservation 

//For user-admin-manager
router.get("/",authServices.allowedTo('user','admin','manager'),HistoryReservationForLoggedUser,getAllReservations)
router.get("/:id",authServices.allowedTo('user','admin','manager'),findSpecificReservations)
router.put("/:id/pay",authServices.allowedTo('admin','manager'),updateReservationToPaid)
router.route("/:id/expire").put(authServices.allowedTo('admin','manager'),updateReservationToExpire)

module.exports = router