const ExpressError = require('./utils/expressError');
const Campground = require('./models/campground');
const Review = require('./models/review');
const { reviewSchema, campgroundSchema } = require('./schemas');

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body); 
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body); 
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Kindly login to continue');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isCampgroundAuthor = async (req, res, next) => {
    const { id } = req.params; 
    const campground = await Campground.findById(id); 
    if(!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission!'); 
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params; 
    const review = await Review.findById(reviewId); 
    if(!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission!'); 
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}