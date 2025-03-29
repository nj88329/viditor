const express = require('express');
const router = express.Router();
const fs = require("fs");
const { getFiles } = require('../controllers/fileController')



router.get('/files', getFiles );   



module.exports = router;