const express = require('express'); 
const router = express.Router(); 
const passport = require('passport');
const User = require('../models/user'); 
const catchAsync = require('../utils/CatchAsync');
const { isLoggedIn, storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err=> {
            if(err) return next(err);
            req.flash('success', 'Welcome to YelpCamp');
            res.redirect('/campgrounds');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Welcome!'); 
    res.redirect(res.locals.returnTo);
})

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout( err => {
        if (err) return next(err);
        req.flash('success', 'Logged out successfully');
        res.redirect('/campgrounds');
    });
}); 

module.exports = router;