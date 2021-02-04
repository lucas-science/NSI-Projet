const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// routeur renvoyant vers les fonctions : signup et signin
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;