const Expense = require('../models/expense');
const path = require('path');
const rootDir = require('../util/path');
const User = require('../models/user');
// const DownloadUrl = require('../models/downloadUrl')
// const Userservices = require('../services/userservices');
// const s3services = require('../services/s3services')
// function isstringinvalid(string){
//     if(string==undefined || string.length==0){
//         return true
//     }else{
//         return false
//     }
// }

exports.createExpense = async (req,res,next) => {
    try {
        const expenseAmt = req.body.expenseAmt;
        const description = req.body.description;
        const category = req.body.category;
    // const { expenseAmt, description, category } = req.body;
        
            if((!expenseAmt) || (!description) || (!category)){
                return res.status(400).json({success:false,message:'parameter is missing'})
            }
            
            await Expense.create({
               expenseAmt: expenseAmt,
               description : description,
               category:category,
               userId: req.user.id
            });

            res.status(201).json({message:"successfully created new expense"});
            // res.json({expenseCreated: expense});
            
        } catch (error) { 
            console.log(error)
            res.status(500).json({ error: error})
    }
}


exports.getExpenses = async (req,res,next) => {
    Expense.findAll({ where : { userId: req.user.id}}).then(expenses => {
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ error: err, success: false})
    })
    // try {

    //     let data = await Expense.find({userId: req.user})

    //     res.status(200).json({
    //         data,
    //     })
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({error:err});
    // }
}

exports.getAllUsers = async(req,res,next)=>{
    // User.find()
    // .then(result => {
    //     res.status(201).json({success: true, data: result})
    // })
    // .catch(err => {
    //     return res.status(500).json({success:false , message:"failed"})
    // })
    try {
        const users=await User.find()
        const expenses=await Expense.find()
        const userAggregatedExpenses={}
        expenses.forEach((expense)=>{
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId] = userAggregatedExpenses[expense.userId] + expense.expenseAmt
            }else{
                userAggregatedExpenses[expense.userId]=expense.expenseAmt
            }
        })
        console.log(userAggregatedExpenses)
        var leaderBoard=[];
        users.forEach((user)=>{
            leaderBoard.push({id: user._id,name:user.username,totalExpense:(userAggregatedExpenses[user.id]||0)})

        })
        console.log(leaderBoard)
        res.status(200).json({data: leaderBoard})

    } catch (error) {
        res.status(500).json({success : false, data : error});
    }
}

exports.getInfoForPremiumUsers = async (req,res,next) => {
    try{
            const userid = req.params.clickedUserId;
            // console.log(user)
            const expenses = await Expense.find({ userId: userid})
            console.log(expenses)
            return res.status(200).json({success:true , data: expenses })

    }
    catch(error){
        return res.status(500).json({success : false, data : error});
    }
}


exports.deleteExpense = async (req,res,next) => {
    try{
        const expenseid=req.params.expenseid;
        console.log(expenseid, '>>')
        if(isstringinvalid(expenseid)){
           return res.status(400).json({success:false,message:'bad parameter'})
        }
        const expense=await Expense.deleteOne({_id:expenseid,userId:req.user})
        res.status(200).json({success:true,message:'Deleted Successfully'})
    }
    catch(err){
        res.status(500).json({message:'internal Error',success:false})
    }
}

// exports.downloadExpense = async (req,res,next) => {
//     try {
//         const expense = await Expense.find({ userId: req.user._id})

//         console.log(expense)
    
//         const stringifiedExpense = JSON.stringify(expense)
//         const userId = req.user._id;


    
//         const filename = `Expense${userId}/${new Date()}.txt`
    
//         const fileURL = await s3services.uploadToS3(stringifiedExpense,filename)
    
//         const downloadUrlData = new DownloadUrl({
//             fileURL: fileURL,
//             filename,
//             userId: req.user
//         })
        
//         downloadUrlData.save();
//         res.status(200).json({fileURL, downloadUrlData, success: true});
//     } catch (error) {
//         res.status(500).json({fileURL: '', success:false})
//     }

// }

// exports.downloadAllUrl = async(req,res,next) => {
//     try {
//         let urls = await DownloadUrl.find();
//         if(!urls){
//             res.sttus(404).json({ message: 'no urls found'})
//         }
//         res.status(200).json({ urls, success: true})
//     } catch (error) {
//         res.status(500).json({error})
//     }
// }