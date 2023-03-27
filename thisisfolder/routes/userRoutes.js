const express = require('express');
const router = express.Router();
const userControls = require('../controlers/userControls')
const expenseControlls = require('../controlers/expenseControlls')
const userAuthentication = require('../middleware/auth')

router.post('/insert-expense',userAuthentication.authenticate,expenseControlls.createExpense);
router.delete('/delete-expense/:expenseid',userAuthentication.authenticate,expenseControlls.deleteExpense);
router.post('/get-expenses/',userAuthentication.authenticate,expenseControlls.getExpenses)

// router.post('/addexpense', userauthentication.authenticate,  expenseController.addexpense )
// router.get('/getexpenses', userauthentication.authenticate ,  expenseController.getexpenses )
// router.delete('/deleteexpense/:expenseid', userauthentication.authenticate , expenseController.deleteexpense)

router.post('/signup',userControls.postUser);
router.post('/login',userControls.postuserLogin)

module.exports = router;