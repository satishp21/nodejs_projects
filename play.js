//created admin route and shop route to make code clean.
const express = require('express')
const bodyParser= require("body-parser")
const app = express()

const adminRoutes = require('./routes/admin')
const shoproutes = require('./routes/shop')
app.use(bodyParser.urlencoded({extended: false}))

app.use(adminRoutes)
app.use(shoproutes)

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not fount</h1>')
})

// const server = http.createServer(app) // no need as using app.listen(3000)

app.listen(3000)