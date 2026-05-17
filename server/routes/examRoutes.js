const express = require("express");

const router = express.Router();

const examController = require("../controllers/examController");

// const { get } = require("./authRoutes");

//Tạo API ===PUBLIC====
//GET=========Lấy danh sách đề thi============
router.get("/", examController.getExams);

// thống kê độ khó
router.get(
    "/difficulty-count/:subject_id",
    examController.getQuestionCountByDifficulty
);

//Lấy chi tiết đề == chưa hiểu.
router.get("/:id", examController.getExamDetail);


//POST =========Tạo đề thi============
// router.post("/", examController.postExam);
//POST tạo API: tạo đề + random câu hỏi
// router.post('/', examController.postExam); //tạo thủ công
router.post("/subject", examController.createExamBySubject); // QUAN TRỌNG tạo random đề

//PUT 
// router.put("/:id", examController.putExam);

//DELETE
// router.delete("/:id", examController.deleteExam);

module.exports = router;