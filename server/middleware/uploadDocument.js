// middleware/uploadDocument.js
const multer = require("multer");

// Lưu file tạm thời vào RAM dưới dạng Buffer
const storage = multer.memoryStorage();

// Bộ lọc chỉ chấp nhận các định dạng file Word
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ chấp nhận file Word .doc hoặc .docx"), false);
    }
};
const uploadWord = multer({ 
    storage, 
    fileFilter, 
    limits: { fileSize: 10 * 1024 * 1024 } 
});
module.exports = uploadWord;