// const http = require('http'); // no need as using app.listen(3000)

const express = require('express')
const bodyParser= require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(('/add-product'),(req,res,next) => { //before "/" as request goes throgh file top to bottom
    res.send('<form action="/product" method="POST" ><input type="text" name ="title"><input type="number" name ="size"><button type="submit"> Add Product</buttton></form>')
})

app.use('/product', (req,res,next) =>{
    console.log(req.body)
    res.redirect('/')
})

app.use(('/'),(req,res,next) => {
    res.send('<h1>HEllo from express</h1>')
})


// const server = http.createServer(app) // no need as using app.listen(3000)

app.listen(3000)