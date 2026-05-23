const multer = require("multer");

const path = require("path");



// nơi lưu file
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});



// chỉ cho upload PDF
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {

        cb(null, true);

    } else {

        cb(new Error("Chỉ được upload PDF"));
    }
};



const upload = multer({

    storage,
    fileFilter
});



module.exports = upload;