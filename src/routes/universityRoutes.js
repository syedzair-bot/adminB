const express = require('express');
const router = express.Router();
const universityController = require('../controller/universityController');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.array('docs'), universityController.addUniversity);
router.get('/all', universityController.getUniversities);

module.exports = router;
