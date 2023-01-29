const express = require('express');
const router = express.Router();
// const User = require('../models/user');
// const passport = require('passport')
// const threader = require('../controllers/threader')
const {isLoggedIn, ValidatePost, ValidateThread, isAuthor} = require('../middleware');
const poster = require('../controllers/poster2')
const wrapAsync = require('../Utils/wrapAsync')
// const {storage} = require('../cloudinary/index')
// const upload = multer({storage})

router.route('/')
    .get(poster.renderPost)
    .post(isLoggedIn, wrapAsync(poster.newPost))
    .put(wrapAsync(poster.editPost))
    .delete(wrapAsync(poster.deletePost))

router.route('/:postName')
    .get(poster.renderComments)
    .post(poster.newComment)
    .put(poster.editComment)
    .delete(poster.deleteComment)
// router.route('/posts')
//     .get(auth.renderLogin)
//     .post(passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), auth.login)

// router.get('/logout', auth.logout)

module.exports = router;