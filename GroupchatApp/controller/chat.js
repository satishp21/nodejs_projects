const Chat = require('../models/chat');
const User = require('../models/users');

const addmessage = async(req,res)=>{
    try{
    const {message} = req.body

    if(message == undefined || message.length === 0 ){
        return res.status(400).json({success: false, message: 'message missing'})
    }

    const chat = await Chat.create({name:req.user.name,message,userId: req.user.id})
    return res.status(201).json({chat, success: true}) 
    } catch(err){
        console.log(err)
        return res.status(500).json({err, success: failed}) 
    }
}

const getmessage = async(req,res)=>{
    try{
        const messages = await Chat.findAll() 
        return res.status(200).json({messages,success:true})
    } catch(err){
        console.log(err)
        return res.status(500).json({err, success: failed}) 
    }
}

module.exports = {
    addmessage,
    getmessage
}
