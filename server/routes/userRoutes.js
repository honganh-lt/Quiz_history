const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
// const authMiddleware = require("../middleware/authMiddleware")

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



module.exports = router;