const path = require('path')
const express = require ("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require('cors')
const rateLimit = require('express-rate-limit')

dotenv.config({path: "config.env"})


const apiError = require(`./utils/apiErorr`)
const dbconnection = require("./config/database")
const globaleError = require(`./middlewares/errorMidlleware`)

//mountRoutes
const mountRoutes=require('./routes')



//Express app
const app = express();
app.use(cors())
app.options('*', cors())



//Dtaebase Call
dbconnection()



//Midlleware
app.use(express.json())   //#Security > {limit:'25kb'} > Set request size limits

const apiLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	// standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	// legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// // store: ... , // Use an external store for more precise rate limiting
})

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter)



if(process.env.NODE_ENV=="development"){
    app.use(morgan("dev"))
    console.log(`mode:${process.env.NODE_ENV} `)
    
}else{
    app.use(morgan("prod"))
    console.log(`mode:${process.env.NODE_ENV} `)
}

    // Mount Routse
    mountRoutes(app)




//Create Handle Unhandled Routes and Send Error to Error Handling Middleware
app.all('*',(req,res,next)=>{    
    next(new apiError(`can not find this route: ${req.originalUrl}`,400))
    })
    
    //Globale Error Handling Middleware
    app.use(globaleError)
    
    //Unhandled Rejections Errors
    process.on('unhandledRejection',(err)=>{
        console.log(`UnhandledRejection Errors: ${err}`)
        server.close(()=>{
            console.error(`APP shut down...`)
            process.exit(1)
    
        })
    
    })



    // listen server to port
    const Port = process.env.PORT || 5000
    const server =app.listen (Port, () => {
        console.log(`server is running on PORT: ${Port}`)
    })
    


