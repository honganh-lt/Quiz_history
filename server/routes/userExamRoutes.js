const express = require("express");

const router = express.Router();

const userExamController = require("../controllers/userExamController");

const { verifyToken } = require("../middleware/authMiddleware"); //file: authMiddleware

//lấy dữ liệu bắt đầu làm + nộp bài + lịch sử + review
//GET ===Public==== lấy dữ liệu đổ vào bảng
router.get("/",userExamController.getAllUserExams);

//số lần thi
// router.get("/attempts",userExamController.getExamAttempts);

//===Private====
//Start Exam
router.post(
    "/start",
    verifyToken,
    userExamController.startExam
);

//Submit
router.post(
    "/submit",
    verifyToken,
    userExamController.submitExam
);

//History
router.get(
    "/history/:user_id",
    verifyToken, 
    userExamController.getHistory
);

//Review
router.get(
    "/review/:user_exam_id",
    verifyToken, 
    userExamController.reviewExam
);


module.exports = router;