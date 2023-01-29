const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')
const auth = require('../controllers/auth')
const wrapAsync = require('../Utils/wrapAsync')

router.route('/getRegister')
    .get(auth.renderReg)
    .post(wrapAsync(auth.Register))

router.route('/getLogin')
    // .get(auth.renderLogin)
    .post(passport.authenticate('local', {failureFlash:true, failureRedirect:'/getLogin'}), auth.login)

// router.get('/logout', auth.logout)

module.exports = router;