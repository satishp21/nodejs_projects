// const http = require('http'); // no need as using app.listen(3000)

const express = require('express')
const app = express()

app.use((req,res,next) => {
    console.log("in the middleware!")
    next()
})

app.use((req,res,next) => {
    console.log("in the another middleware!")
    res.send('<h1>HEllo from express</h1>')
    // res.send({ key1: 5 })
})

// const server = http.createServer(app) // no need as using app.listen(3000)

app.listen(3000)