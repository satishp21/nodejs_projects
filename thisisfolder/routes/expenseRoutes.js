const express = require('express');
const router = express.Router();
const expenseControlls = require('../controlers/expenseControlls');
const userAuthentication = require('../middleware/auth')

// router.post('/insert-expense',userAuthentication.authenticate,expenseControlls.createExpense);
// router.delete('/delete-expense/:expenseid',userAuthentication.authenticate,expenseControlls.deleteExpense);
// router.post('/get-expenses/',userAuthentication.authenticate,expenseControlls.getExpenses)


// router.get('/premiums',userAuthentication.authenticate, expenseControls.getAllUsers)
// router.get('/download',userAuthentication.authenticate,expenseControls.downloadExpense)
// router.get('/getAllUrl',userAuthentication.authenticate,expenseControls.downloadAllUrl)
// router.get('/getInfo/:clickedUserId',userAuthentication.authenticate,expenseControls.getInfoForPremiumUsers)

module.exports = router;