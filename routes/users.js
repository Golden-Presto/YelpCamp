const express = require('express'); 
const router = express.Router(); 
const passport = require('passport');
const catchAsync = require('../utils/CatchAsync');
const { isLoggedIn, storeReturnTo } = require('../middleware');
const authController = require('../controllers/authController');


router.route('/register')
    .get(authController.renderRegisterForm)
    .post(catchAsync(authController.registerUser));

router.route('/login')
    .get(authController.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), authController.loginUser);

router.get('/logout', isLoggedIn, authController.logoutUser); 

module.exports = router;