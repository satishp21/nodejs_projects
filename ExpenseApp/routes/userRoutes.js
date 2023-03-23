const express = require('express');
const router = express.Router();
const userControlls = require('../controllers/userControls');

router.post('/user/signup', userControlls.signup)
router.post('/user/successlogin', userControlls.login)

// router.post('/add-expense', userControlls.addExpense);
// router.get('/get-expense', userControlls.getexpense);
// router.post('/delete-expense', userControlls.deleteexpense);
// router.get('/edit-expense :expenseId', userControlls.editexpense)
// router.post('/edit-expense', userControlls.postEditExpense)

module.exports = router;