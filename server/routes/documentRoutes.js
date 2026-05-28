// routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const uploadWord = require("../middleware/uploadDocument");
router.get("/", documentController.getAllDocuments);
router.get("/subject/:subjectId", documentController.getDocumentsBySubject);
router.get("/detail/:documentId", documentController.getDocumentDetail);

// Ép đường dẫn truyền file Word thông qua thuộc tính key là "file"
router.post("/", uploadWord.single("file"), documentController.createDocument);
router.put("/:id", uploadWord.single("file"), documentController.updateDocument);

router.delete("/:id", documentController.deleteDocument);

module.exports = router;