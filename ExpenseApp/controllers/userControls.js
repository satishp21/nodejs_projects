// const Expense = require('../models/expense');
const User = require('../models/user');
const bcrypt = require('bcrypt')

exports.signup = async(req,res,next) => {
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

exports.login = async(req,res,next) => {
  const email = req.body.email;
  const password = req.body.password;

  if((!email) || (!password)){
    return res.status(400).json('please enter all thegiven field')
  }

  // User.findOne({where:{email:email,password:password}})
  const user = await User.findAll({where:{email}})
  // .then(result =>{
  //   console.log(result)
    if (user.length > 0){
      // return res.status(404).send('<h1>user doesnot exist</h1>')
      bcrypt.compare(password,user[0].password,(err,result2)=>{
        if(err){
          res.status(500).json({success:false,message:'something went wrong'})
        }
        if(result2 === true){
          res.status(200).json({success:true,message:'user logged in successfully'})
        }
      })
    }
}
  // })
  // User.findOne({where:{password:password}})
  // .then(result =>{
  //   bcrypt.compare(password,result[0].password,(err,result2)=>{
  //     if(err){
  //       res.status(500).json({success:false,message:'something went wrong'})
  //     }
  //     if(result2 === true){
  //       res.status(200).json({success:true,message:'user logged in successfully'})
  //     }
  //     else{
  //       return res.status(400).json({success:false,message:'pass is wrong'})
  //     }
  //   })
    // console.log(result)
    // if ((result) == null){
    //   return res.status(401).send('<h1>user not authorized</h1>')
    // }
    // res.send('<h1>successfully logined</h1>')
  // })
  // .catch(err=>{
  //   res.status(500).send(err)
  // })


// exports.getexpense = (req,res,next) => {
// Expense.findAll()
//   .then((expenses) =>{
//     res.json(expenses);
//   })
//   .catch(err => {console.log(err)})
// }

// exports.addExpense = (req,res,next) => {
//     const amount = req.body.amount;
//     const description = req.body.description;
//     const category = req.body.category
//     // console.log(userName,email);
//     Expense.create({
//         amount: amount,
//         description: description,
//         category: category
//     })
//     .then(result => {
//         // console.log(result);
//         res.redirect('/');
//     })
//     .catch(err => { console.log(err) });
// }

// exports.deleteexpense = (req,res,next) => {
//   const expenseId = req.body.expenseId;
//   console.log(expenseId);
//   Expense.findByPk(expenseId)
//   .then(expense => {
//       return expense.destroy();
//   })
//   .then(result => {
//       console.log('DELETED PRODUCT');
//       res.redirect('/');
//   })
//   .catch(err => { console.log(err) });
// }

// exports.editexpense = (req,res,next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const expenseId = req.body.expenseId
//   Expense.findByPk(expenseId)
//     .then(expense => {
//       if (!expense) {
//         return res.redirect('/');
//       }
//       res.render('edit-expense', {
//         pageTitle: 'Edit expense',
//         path: 'edit-expense',
//         editing: editMode,
//         expense: expense[0]
//       });
//     })
//     .catch(err => { console.log(err) });
// }

// exports.postEditExpense = (req, res, next) => {
//   const expenseId = req.body.expenseId;
//   const updatedamount = req.body.amount;
//   const updateddescription = req.body.description;
//   const updatedcategory = req.body.category;

//   Expense.findByPk(expenseId)
//   .then(expense =>{
//     expense.amount = updatedamount;
//     expense.description = updateddescription;
//     expense.category = updatedcategory;
//     return expense.save()
//   })
//   .then(result => {
//     console.log('Updated Expense!')
//     res.redirect('/');
//   })
//   .catch(err=> {
//     console.log(err)
//   })
// };