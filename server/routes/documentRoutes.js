const express = require("express");

const router = express.Router();

const uploadPdf =
require("../middleware/uploadPDF");



const {

    createDocument,

    getDocumentsByLesson,

    deleteDocument,

    getAllDocuments

} = require("../controllers/documentController");




// upload
router.post(
    "/",
    uploadPdf.single("file"),
    createDocument
);




// admin lấy tất cả
router.get(
    "/",
    getAllDocuments
);




// user lấy theo lesson
router.get(
    "/:lessonId",
    getDocumentsByLesson
);




// xoá
router.delete(
    "/:id",
    deleteDocument
);



module.exports = router;