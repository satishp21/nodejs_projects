const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req,res,next) => {

    try {
        const token = req.header('Authorization')
        console.log(token,"this is whare errroe os coming");
        const user = jwt.verify(token,'secretkey')
        // const user = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJzYXRpc2giLCJpYXQiOjE2Nzk5MTEwNjV9.pHdFGLuhDg6muq2Gq9IvrKS4zIenqGdah_TM_JaFlNs",'secretkey')
        console.log("userId>>>>>",user.userId)

        User.findByPk(user.userId).then((user=>{
            console.log('userrrr',user._id)
            req.user=user;
            console.log(req.user._id)
            console.log(req.user)
            next();
        }))

    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    authenticate
};