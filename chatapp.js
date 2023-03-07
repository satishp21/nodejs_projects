const express = require('express')
const bodyParser= require("body-parser")
const fs = require("fs")
const app = express()
const data = require('./username.txt')

app.use(bodyParser.urlencoded())

app.get("/",(req,res) => {
    fs.readFile('username.txt' ,(err,data) => {
        if (err){
            data ='no chat exists'
        }
        res.send(
            `${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value)=localStorage.getItem('username')">
                <input type="text" id="message" name ="message">
                <input type="hidden" id="username" name ="username">
                </br>
                <button type="submit">Send</buttton>
            </form>`)
    })

})
app.post('/', (req,res) =>{
    // console.log(req.body)
    // console.log(req.body.username)
    // console.log(req.body.message)
    fs.writeFile("username.txt",`:${req.body.message}`,{flag:'a'}, (err) =>{
        if (err) {console.log(err)}
        res.redirect("/")
    })
    // res.redirect("/")
})

app.get("/login",(req,res) =>{
    res.send(`<form action="/login" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)"><input type="text" placeholder="username" id="username" name ="username"><button type="submit">Login</buttton></form>`)
})

app.post("/login",(req,res) =>{
    console.log(req.body)
    console.log(req.body.username)
    fs.writeFile("username.txt",`${req.body.username}`,{flag:'a'},(err) =>{
        if (err) {console.log(err)}
        res.redirect("/")
    })
})
app.listen(3000)