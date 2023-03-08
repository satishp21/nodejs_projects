const express = require('express')

const path= require("path")

const rootDir = require('../util/path') //another way to gove path to html 
const router = express.Router()

router.get(('/add-product'),(req,res,next) => {
    // res.sendFile(path.join(__dirname,'../','views','add-product.html')) // one way to give path to html
    // // '../' can be written as '..' or can be used a helper/util
    res.sendFile(path.join(rootDir,'views','add-product.html'))
})


router.post('/add-product', (req,res,next) =>{
    console.log(req.body)
    res.redirect('/')
})

module.exports = router