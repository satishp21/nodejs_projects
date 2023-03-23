const express = require('express');
const router = express.Router();
const userControlls = require('../controllers/userControls');

router.post('/insert-user', userControlls.addUser);
router.get('/get-users', userControlls.getUsers);
router.post('/delete-user', userControlls.deleteUser);

module.exports = router;