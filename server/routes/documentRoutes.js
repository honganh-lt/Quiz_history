const express = require("express");
const router = express.Router();

const {
    createDocument,
    getAllDocuments,
    deleteDocument,
    updateDocument,
    getDocumentsBySubject,
    getDocumentDetail
} = require("../controllers/documentController");

// create
router.post("/create", createDocument);

// get all
router.get("/", getAllDocuments);

// GET THEO MÔN HỌC
router.get("/subject/:subjectId", getDocumentsBySubject);

router.get("/detail/:documentId", getDocumentDetail);
// update
router.put("/update/:id", updateDocument);

// delete
router.delete("/:id", deleteDocument);

module.exports = router;