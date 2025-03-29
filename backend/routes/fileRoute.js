const express = require('express');
const router = express.Router();
const fs = require("fs");
const { getFiles } = require('../controllers/fileController')

router.get('/hello', (req, res)=>{
    console.log('hello');
    return res.status(200).json({message:'hello route working'})
})

router.get('/files', getFiles );   



module.exports = router;