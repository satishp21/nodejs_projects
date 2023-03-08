//created admin route and shop route to make code clean.
const path = require("path")
const express = require('express')
const bodyParser= require("body-parser")
const app = express()

const adminRoutes = require('./routes/admin')
const shoproutes = require('./routes/shop')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin', adminRoutes);
app.use(shoproutes)

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

// const server = http.createServer(app) // no need as using app.listen(3000)

app.listen(3000)