const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware")

//Taoj API
router.get("/", userController.getUser);

//POST
router.post("/", userController.postUser);

//PUT block
router.put("/block/:id", userController.toggleBlockUser);

//PUT
router.put("/:id", userController.putUser);

//DELETE
router.delete("/:id", userController.deleteUser);

//user
router.post(
    "/forgot-password",
    userController.forgotPassword
);

router.post(
    "/reset-password",
    userController.verifyOtp
);

router.post(
    "/change-password",
    authMiddleware.verifyToken,
    userController.changePassword
);

module.exports = router;