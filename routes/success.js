const express = require('express')

const path= require("path")

const rootDir = require('../util/path')

const router = express.Router()

router.get('/success',(req,res)=>{
    res.sendFile(path.join(rootDir,'views','success.html'))
})


module.exports = router