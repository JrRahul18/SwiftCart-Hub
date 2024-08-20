const express = require("express");
const router = express.Router();
const { isAuthenticated, checkRole } = require("../middleware/Auth");


const userController = require("../controllers/User");

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

router.post("/password/forget-password", userController.postForgetPassword);

router.put("/password/reset/:token", userController.resetPassword);
router.get('/my-account',isAuthenticated, userController.myAccountDetails)
router.put('/password/change-password', isAuthenticated, userController.changePassword)
router.put('/my-account/update-profile', isAuthenticated, userController.updateUser)
router.get('/admin/all-users', isAuthenticated, checkRole("admin"), userController.getAllUsersDetails)
router.get('/admin/user/:id', isAuthenticated, checkRole("admin"), userController.getUserDetails)
router.put('/admin/user/:id', isAuthenticated, checkRole("admin"), userController.updateUserRole)
router.delete('/admin/user/:id', isAuthenticated, checkRole("admin"), userController.deleteUser)



module.exports = router;
