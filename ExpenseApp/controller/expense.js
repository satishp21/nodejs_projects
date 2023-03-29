const Expense = require('../models/expenses');
const User = require('../models/users');
const sequelize = require('../util/database');

const addexpense = async(req, res) => {
    const t = await sequelize.transaction()
    try{ 
    const { expenseamount, description, category } = req.body;

    if(expenseamount == undefined || expenseamount.length === 0 ){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }
    const expense = await Expense.create({ expenseamount, description, category, userId: req.user.id},{transaction:t})
        const totalExpense = Number(req.user.totalExpenses) + Number(expenseamount)
        console.log(totalExpense)
        await User.update({
            totalExpenses: totalExpense
        },{ 
            where:{id:req.user.id},
            transaction:t
        })
        await t.commit();// only after this data gets updated database
        return res.status(201).json({expense, success: true} );
    }
    catch(err) {
        await t.rollback()
        return res.status(500).json({success : false, error: err})
      }
}

const getexpenses = async(req, res)=> {
    try{
    const expenses = await Expense.findAll({ where : { userId: req.user.id}})
        return res.status(200).json({expenses, success: true})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ error: err, success: false})
    }
}

const deleteexpense = async (req, res) => {
    console.log('start')
    try{
    const kuchbhi = req.params.expenseid;
    const expenseid = req.params.expenseid;
    const expenseobj  = await Expense.findAll ({where : {id : kuchbhi}})
    console.log(expenseobj[0].expenseamount,expenseobj[0].userId)
    const user= await User.findAll ({where : {id : expenseobj[0].userId }})
    console.log(user)

    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({success: false, })
    }
    const totalExpense = Number(user[0].totalExpenses) - Number(expenseobj[0].expenseamount)
    console.log(totalExpense)
    await User.update({
        totalExpenses: totalExpense
    },{ 
        where:{id:req.user.id},
        // transaction:t
    })
    const noofrows = await Expense.destroy({where: { id: expenseid, userId: req.user.id }})
        if(noofrows === 0){
            return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
        }
        return res.status(200).json({ success: true, message: "Deleted Successfuly"})
    }catch (err) {
        // await t.rollback()
        console.log(err)
        return res.status(500).json({success : false, error: err})
    }
} 

module.exports = {
    deleteexpense,
    getexpenses,
    addexpense
}