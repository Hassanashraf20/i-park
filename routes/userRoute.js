const express = require ("express")

const {createUsers,getUsers,getUser,updateUser,deleteUser,
    changeUserPassword,getLoggedUser,updateLoggedUserPassword,updateLoggedUserData
}= require("../controllers/userController")


const {createUserValidator,getUserValidator,updateUserValidator,
    changeUserPasswordValidator,deleteUserValidator,updateLoggedUserValidator
}= require("../utils/validator/userValidator")


const authServices=require('../controllers/authController')


const router = express.Router()

router.use(authServices.auth)

router.route('/getMe').get(getLoggedUser,getUser)
router.route('/changeMyPassword').put(updateLoggedUserPassword)
router.route('/updateMe').put(updateLoggedUserValidator,updateLoggedUserData)



//admin
router.route('/changePassword/:id').put(changeUserPasswordValidator,changeUserPassword)

router.use(authServices.allowedTo('admin'))

router.route("/").get(getUsers)
router.route("/").post(createUserValidator,createUsers)
router.route("/:id").get(getUserValidator,getUser)
router.route("/:id").put(updateUserValidator,updateUser)
router.route("/:id").delete(deleteUserValidator,deleteUser)




module.exports = router