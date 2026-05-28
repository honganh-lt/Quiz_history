//import thư viện express
const express = require("express");

//Tạo router
const router = express.Router();

//import file
const questionController = require("../controllers/questionController");
const uploadExcel = require("../middleware/uploadExcel");
//Tạo API method
//GET (getQuestionByLesson: câu hỏi theo bài ad+us)
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
    uploadExcel.single("file"),
    questionController.importQuestions
)

module.exports = router;
