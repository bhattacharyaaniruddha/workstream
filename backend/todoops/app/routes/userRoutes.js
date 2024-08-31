const express = require('express');
const controller = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const authController = require('../controllers/authController.js')
const router = express.Router();

router.route("/api/userops/addUser")
.post(authMiddleware, authController.verifyUser,controller.addUser);

router.route("/api/userops/getUsers")
.get(authMiddleware, authController.verifyUser,controller.getUsers);

router.route("/api/userops/addGroup")
.post(authMiddleware, authController.verifyUser,controller.addGroup);

router.route("/api/userops/getGroup")
.get(authMiddleware, authController.verifyUser,controller.getGroup);

router.route("/api/userops/getCompanies")
.get(controller.getCompanies);

router.route("/api/userops/getAllManagersByCoy")
.get(controller.getAllManagersByCoy);

router.route("/api/userops/registerNewUser")
.post(controller.registerNewUser);

router.route("/api/userops/login")
.post(controller.login);


module.exports = router;