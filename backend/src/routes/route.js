const express = require('express');
const multer = require('multer');
const upload = multer()
const Controller = require('../controller/controller')
const router = express.Router()

const controller = new Controller();

router.post('/parse', upload.single('file'), controller.parse)
router.get('/parse', upload.single('file'), controller.parse)
module.exports = router;