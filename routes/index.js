const GarageRoute = require("./garageRoute")
const AreaRoute = require("./areaRoute")
const SlotRoute = require("./slotRoute")
const CarServices = require("./carServicesRoute")
const UserRoute = require("./userRoute")
const authRoute = require("./authRoute")
const Reservation = require("./reservationRoute")

const mountRoutes = (app)=>{

app.use('/api/Garage',GarageRoute),
app.use('/api/Area',AreaRoute),
app.use('/api/Slot',SlotRoute),
app.use('/api/CarServices',CarServices)
app.use('/api/users',UserRoute)
app.use('/api/auth',authRoute)
app.use('/api/Reservations',Reservation)
}


module.exports = mountRoutes