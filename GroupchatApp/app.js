const express = require('express');
const fs =require('fs')
const path = require('path')
var cors = require('cors')

const sequelize = require('./util/database');

const Chat = require('./models/chat');
const User = require('./models/users');

const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat')

const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(cors());

// app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(express.json());  //this is for handling jsons

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)

User.hasMany(Chat)
Chat.belongsTo(User)

sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT);
    })
    .catch(err => {
        console.log(err);
    })