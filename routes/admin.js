const express = require('express')

const router = express.Router()

router.get(('/add-product'),(req,res,next) => { //before "/" as request goes throgh file top to bottom
    res.send('<form action="/product" method="POST" ><input type="text" name ="title"><input type="number" name ="size"><button type="submit"> Add Product</buttton></form>')
})

router.post('/product', (req,res,next) =>{
    console.log(req.body)
    res.redirect('/')
})

module.exports = router