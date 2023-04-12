const User = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

const generateAccessToken = (id, name) => {
    return jwt.sign({ userId : id, name: name } ,"sec key");
}

const login = async (req, res)=>{
    try{
    const { email, password } = req.body;
    console.log('email', email)
    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({err: "Bad parameters . Something is missing"})
    }

    const user = await User.findOne({where:{email}})

    if (user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if (err){
                throw new Error('Something went wrong')
            }
            if(result){
                res.status(200).json({success: true, message: "User logged in successfully", token: generateAccessToken(user.id, user.name)})
            }
            else{
            return res.status(400).json({success: false, message: 'Password is incorrect'})
           }
        })
    }
    else{
        return res.status(404).json({err:"user doesnot exist"})
    }

    }catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports = {
    signup,
    login,
    generateAccessToken
}