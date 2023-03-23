const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const rootDir = require('./util/path');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user');
const sequelize = require('./util/database');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);

app.get('/',(req,res) => {
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
})

sequelize
.sync()
.then(result => {
    // console.log(result);
    app.listen(3000,() => {
        console.log('Server listening on port 3000');
    })
})
.catch(err => {
    console.log(err);
})