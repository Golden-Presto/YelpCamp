const User = require('../models/user'); 

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res) => {
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
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    req.flash('success', 'Welcome!'); 
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout( err => {
        if (err) return next(err);
        req.flash('success', 'Logged out successfully');
        res.redirect('/campgrounds');
    });
}