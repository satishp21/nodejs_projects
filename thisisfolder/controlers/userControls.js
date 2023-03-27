const path = require('path');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rootDir = require('../util/path');
function isstringinvalid(string){
    if(string==undefined || string.length==0){
        return true
    }else{
        return false
    }
}

exports.postUser = async(req,res,next) => {
    try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
    if((!name) || (!email) || (!password)){
      return res.status(400).json('please enter all thegiven field')
    }
    const saltrounds = 10
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
      console.log(err)
      await User.create({
        name: name,
        email: email,
        password: hash
      })
      await res.status(201).json({message:"successfully created new user"})
    })
    // .then(result => {
    //   res.status(201).json({message:"succesfully created new user "})
    // }) 
    // .then(result => {
    //   res.redirect('/user/login');
    // })
  
    }catch(err) {
      res.status(500).json(err)
    };
  }
// exports.postUser = async (req,res,next) => {
//     // const { username,email,password } = req.body;
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     try { 
    
//     if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
//         return res.status(400).json({err:'bad parameter....something went wrong'})
//     }
//     const userExist = await User.find({ email })
//     console.log(userExist)

//     if(userExist.length > 0){
//         res.status(207).json({ message: 'User already exists with this email Id'})
//     } else {
//         const saltrounds = 10;
//         bcrypt.hash(password,saltrounds, async (err,hash) => {
//             // const user = new User({  username, email, password: hash })
//             await User.create({
//                 name: name,
//                 email: email,
//                 password: hash
//               })
//             await res.status(201).json({successMsg:'User created successfully'})
//         }) 
//     } 
//  } catch(err){
//             res.status(500).json({failMsg: 'User not created'})
//         }
        
// }

function generateAccessToken(id,name/*,ispremiumuser*/){
    return jwt.sign({userId:id,name:name/*,ispremiumuser:ispremiumuser*/},'secretkey')
}

// exports.postuserLogin = async (req,res,next) => {
//     const { email, password } = req.body;

// try {
//     if(isstringinvalid(email) || isstringinvalid(password)){
//         res.status(400).json({message:'email or password is missing',success:false})
//     }

//     const registeruserExist = await User.find({ email : email })

//     if( registeruserExist.length > 0){
//         bcrypt.compare(password, registeruserExist[0].password,(err,result) => {
//             if(result == true){
//                 return res.status(201).json({registeruserExist, successMsg: 'User logged in successfully',token: generateAccessToken(registeruserExist[0].id, registeruserExist[0].name, registeruserExist[0].ispremiumuser)})
                
//             } else {
//                 return res.status(401).json({errMsg: 'You entered wrong password. Try again', err: err})
//             }
//         })
//     } else {
//         res.status(404).json({errorMsg: 'User does not exist'})
//     }
// } catch (error) {
//     res.status(500).json({errorMsg: error})
// }
// }

exports.postuserLogin = async(req,res,next) => {
    try{
    const email = req.body.email;
    const password = req.body.password;
  
    if((!email) || (!password)){
        return res.status(400).json({message:'email or password is missing',success:false})
    }

    const registeruserExist = await User.findAll({where:{ email:email }})
    if(registeruserExist){
        bcrypt.compare(password, registeruserExist[0].password,(err,result) => {
            if(err){
                return res.status(401).json({errMsg: 'You entered wrong password. Try again', err: err})
            } else {
                return res.status(200).json({registeruserExist, successMsg: 'User logged in successfully',token: generateAccessToken(registeruserExist[0].id, registeruserExist[0].name /*, registeruserExist[0].ispremiumuser*/)})
            }
        })
    } else {
        res.status(404).json({errorMsg: 'User does not exist'})
    }
} catch (error) {
    res.status(500).json({errorMsg: error})
}
}