const express = require('express');
const bodyParser = require('body-parser');

//database
const sequelize = require('./util/database');
const cors = require('cors');
const { serialize } = require('v8');

//routes
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const chatRoutes = require('./routes/chat');
//models
const User = require('./models/user')
const Chat = require('./models/chats')
const Group = require('./models/group');
const userGroup = require('./models/userGroup');

const app = express();

app.use(express.json());
app.use(cors({
    origin:'*',
    credentials:true
}));

app.use('/user',userRoutes);
app.use(groupRoutes);
app.use(chatRoutes);

//associations
User.hasMany(Chat);
Chat.belongsTo(User);

Group.belongsToMany(User, {through:userGroup});
User.belongsToMany(Group, {through: userGroup});

Group.hasMany(Chat);
Chat.belongsTo(Group);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });