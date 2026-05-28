// Import thư viện express dùng để tạo server và API
const express = require("express");
// Tạo 1 router riêng định tuyến quản lý API
const router = express.Router();
// Import file Controller (Đã sửa chính tả)
const chapterController = require("../controllers/chapterController");

// ================= Định tuyến API quản lý Chương học =================

// Lấy danh sách tất cả các chương
router.get("/", chapterController.getChapters);

// Tạo mới một chương học
router.post("/", chapterController.postChapter);

// Cập nhật thông tin chương học theo ID
router.put("/:id", chapterController.putChapter);

// Xóa chương học theo ID
router.delete("/:id", chapterController.deleteChapter);

module.exports = router;