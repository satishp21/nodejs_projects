const User = require('../models/users');
const bcrypt = require('bcrypt')


function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

 const signup = async (req, res)=>{
    try{
    const { name, email, phonenumber,password } = req.body;
    console.log('email', email)
    if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password) || isstringinvalid(phonenumber)){
        return res.status(400).json({err: "Bad parameters . Something is missing"})
    }

    alreadyuser = await User.findOne({where:{email}})
    if (alreadyuser){
        return res.status(400).json({message: 'user already exist'})
    }

    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
        console.log(err)
        await User.create({ name, email,phonenumber, password: hash})
        return res.status(201).json({message: 'Successfuly create new user'})
    })
    }catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = {
    signup,
}