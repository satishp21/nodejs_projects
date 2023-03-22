const express = require('express');
const router = express.Router();
const userControlls = require('../controllers/userControls');

router.post('/insert-item', userControlls.addItem);
router.get('/get-items', userControlls.getItems);
router.post('/delete-item', userControlls.deleteItem);
router.post('/buy-1', userControlls.reducequntity1);
router.post('/buy-2', userControlls.reducequntity2);

module.exports = router;