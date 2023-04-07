const express = require('express');
const fs =require('fs')
const path = require('path')
var cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');
const FilesDownloaded = require('./models/filesdownloaded');

const userRoutes = require('./routes/user')
const purchaseRoutes = require('./routes/purchase')
const resetPasswordRoutes = require('./routes/resetpassword')
const expenseRoutes = require('./routes/expense')
const premiumFeatureRoutes = require('./routes/premiumFeature')

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

const app = express();
const dotenv = require('dotenv');
const { Stream } = require('stream');

app.use(helmet()) //middleware to  HTTP headers to improve security
app.use(compression())
app.use(morgan('combined',{stream:accessLogStream}))


// get config vars
dotenv.config();

app.use(cors());

// app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(express.json());  //this is for handling jsons

app.use('/user', userRoutes)
app.use('/expense', expenseRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumFeatureRoutes)
app.use('/password', resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(User);

sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT);
    })
    .catch(err => {
        console.log(err);
    })