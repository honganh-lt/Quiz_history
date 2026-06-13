const express = require("express");

const router = express.Router();

const examController = require("../controllers/examController");

// const { get } = require("./authRoutes");

//Tạo API ===PUBLIC====
//GET=========Lấy danh sách đề thi============
router.get("/", examController.getExams);

//Thống kê độ khó
router.get(
    "/difficulty-count/:subject_id",
    examController.getQuestionCountByDifficulty
);

//random theo môn học
router.post("/subject", examController.createExamBySubject);

//hiển thị phía user
router.get("/:id", examController.getExamDetail);

router.put("/:id", examController.updateExam);

module.exports = router;