const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, process.env.SEC_KEY);
        console.log('userID >>>> ', user.userId)
        User.findById(user.userId).then(user => {
            console.log(user,"this is the userrrrr")
            req.user = user; ///ver
            next();
        })

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
      }
}

module.exports = {
    authenticate
}