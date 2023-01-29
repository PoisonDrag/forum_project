const express = require('express');
const router = express.Router();
// const User = require('../models/user');
// const passport = require('passport')
const threader = require('../controllers/threader2')
const wrapAsync = require('../Utils/wrapAsync')

router.route('/')
    .get(threader.renderThread)
    .post(wrapAsync(threader.newThread))

// router.route('/posts')
//     .get(auth.renderLogin)
//     .post(passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), auth.login)

// router.get('/logout', auth.logout)

module.exports = router;