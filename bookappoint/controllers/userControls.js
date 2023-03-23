const User = require('../models/user');

exports.getUsers = (req,res,next) => {
User.findAll()
  .then((users) =>{
    res.json(users);
  })
  .catch(err => {console.log(err)})
}

exports.addUser = (req,res,next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber
    // console.log(userName,email);
    User.create({
        userName: userName,
        email: email,
        phonenumber: phonenumber
    })
    .then(result => {
        // console.log(result);
        res.redirect('/');
    })
    .catch(err => { console.log(err) });
}

exports.deleteUser = (req,res,next) => {
    const userId = req.body.userId;
    console.log(userId);
    User.findByPk(userId)
    .then(user => {
        return user.destroy();
    })
    .then(result => {
        console.log('DELETED PRODUCT');
        res.redirect('/');
      })
    .catch(err => { console.log(err) });
}