const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/documents");
    },

    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname);

        cb(null, Date.now() + ext);
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ cho phép file DOC hoặc DOCX"));
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;