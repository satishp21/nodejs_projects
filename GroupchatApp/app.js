const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const morgan = require('morgan')

const dotenv = require('dotenv');
dotenv.config();

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
    origin:'*', // any origin is aloowed to access resources.
    credentials:true  //allows the server to include cookies and authorization headers in the cross-origin request
}));

app.use(helmet());

app.use('/user',userRoutes);
app.use(groupRoutes);
app.use(chatRoutes);

//associations
User.hasMany(Chat);
Chat.belongsTo(User);

Group.belongsToMany(User, {through:userGroup}); 
User.belongsToMany(Group, {through: userGroup});

//through option specifies the userGroup model or table that maps the relationship between the two main models(Group and User).

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