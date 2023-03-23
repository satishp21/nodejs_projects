const express = require('express')

const path= require("path")
const rootDir = require('../util/path')

const router = express.Router()

// import { contactuscontroller } from '../controllers/contactus' //for controllers


router.get('/contactus',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contactus.html'))
})

// router.get('/contactus',contactuscontroller)


router.post('/contactus',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','success.html'))
})

module.exports = router