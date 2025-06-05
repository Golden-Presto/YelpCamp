const express = require('express'); 
const router = express.Router();
const catchAsync  = require('../utils/CatchAsync');
const { isLoggedIn, isCampgroundAuthor, validateCampground } = require('../middleware');
const campgroundController = require('../controllers/campgroundController');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(campgroundController.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundController.createCampground));
    // .post(upload.array('image'), (req, res) => {
    //     console.log(req.body, req.files)
    //     res.send('Submitted');
    // })

router.get('/new', isLoggedIn, campgroundController.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgroundController.showCampground))
    .put(isLoggedIn, isCampgroundAuthor, upload.array('image'), validateCampground, catchAsync(campgroundController.updateCampground))
    .delete(isLoggedIn, isCampgroundAuthor, catchAsync(campgroundController.deleteCampground));

router.get('/:id/edit', isLoggedIn, isCampgroundAuthor, catchAsync(campgroundController.renderEditForm)); 

module.exports = router;