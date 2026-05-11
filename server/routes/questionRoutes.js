//import thư viện express
const express = require("express");

//Tạo router
const router = express.Router();

//import file
const questionController = require("../controllers/questionController");
const upload = require("../middleware/upload");

//Tạo API method
//GET
router.get("/", questionController.getQuestion);

//POST
router.post("/", questionController.postQuestion);

//PUT
router.put("/:id", questionController.putQuestion);

//DELETE
router.delete("/:id", questionController.deleteQuestion);

//API import (router)
router.post(
    "/import",
    upload.single("file"),
    questionController.importQuestions
)

module.exports = router;
