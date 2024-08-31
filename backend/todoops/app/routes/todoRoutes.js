const express = require('express');
const controller = require('../controllers/todoController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const authController = require('../controllers/authController.js')
const router = express.Router();

router.route("/api/todoops/create")
.post(authMiddleware, authController.verifyUser, controller.create);
    
router.route("/api/todoops/getTasks")
.post(authMiddleware, authController.verifyUser,controller.getTasks);

router.route("/api/todoops/update")
.post(authMiddleware, authController.verifyUser,controller.update);

router.route("/api/todoops/transferToNextDate")
.post(authMiddleware, authController.verifyUser,controller.transferToNextDate);

router.route("/api/todoops/updateStatusOfTask")
.post(authMiddleware, authController.verifyUser,controller.updateStatusOfTask);

router.route("/api/todoops/updateStatusOfCheckoutList")
.post(authMiddleware, authController.verifyUser,controller.updateStatusOfCheckoutList);

router.route("/api/todoops/addProject")
.post(authMiddleware, authController.verifyUser,controller.addProject);
    
router.route("/api/todoops/getProject")
.get(authMiddleware, authController.verifyUser,controller.getProject);

module.exports = router;