const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/index-controller');


router.get('/', userControllers.getApp);
router.get('/usuarios', userControllers.getUser);
router.post('/usuarios', userControllers.postUser);
router.put('/usuarios/:id', userControllers.putUser);
router.delete('/usuarios', userControllers.deleteUser);

module.exports = router;