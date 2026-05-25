const express = require("express");

const router = express.Router();

const examController = require("../controllers/examController");

// const { get } = require("./authRoutes");

//Tạo API ===PUBLIC====
//GET=========Lấy danh sách đề thi============
router.get("/", examController.getExams);

//Update
// router.put("/:id", examController.updateExam);
// router.get("/check-lock/:id", examController.checkExamLock);

// thống kê độ khó
router.get(
    "/difficulty-count/:subject_id",
    examController.getQuestionCountByDifficulty
);


//POST =========Tạo đề thi============
// router.post("/", examController.postExam);
//POST tạo API: tạo đề + random câu hỏi
// router.post('/', examController.postExam); //tạo thủ công
router.post("/subject", examController.createExamBySubject); // QUAN TRỌNG tạo random đề


//Lấy chi tiết đề == chưa hiểu. User
router.get("/:id", examController.getExamDetail);

//PUT 
// router.put("/:id", examController.putExam);

//DELETE
// router.delete("/:id", examController.deleteExam);

module.exports = router;