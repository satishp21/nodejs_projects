const express = require('express')

const path= require("path")

const rootDir = require('../util/path')

const router = express.Router()

router.get(('/'),(req,res,next) => {
    // res.sendFile(path.join(__dirname,'../','views','shop.html')) // one way to give path to html
    // // '../' can be written as '..' or can be used as helper/util
    res.sendFile(path.join(rootDir,'views','shop.html'))
})

module.exports = router