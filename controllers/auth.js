const User = require('../models/user')
const {isLoggedIn, ValidateCamp, isAuthor} = require('../middleware');

module.exports.renderReg = async (req,res)=>{
    const allUsers = await User.find({})
    // console.log(allUsers)
    res.send({users : allUsers});
    // res.send({express:'./Users/register'});
}

module.exports.Register = async (req,res)=>{
    try{
    const {password,username} = req.body;
    const user = new User({username});
    const registeredUser = await User.register(user,password);
    console.log("Logged")
    req.login(registeredUser,err=>{
        if(err) return next(err);
        // req.flash('success',`Welcome to social media ${username}!`);
        // console.log(req.user)
        // console.log(req.loggedInUser)
        res.send({log: true, loggedInUser : req.user})
        // res.redirect('/Threads');
    })    
}
catch(e){
    console.log(e)
    // req.flash('error',e.message);
    res.send({log: false, loggedInUser : false})
    // res.redirect('/register')
}
}

module.exports.renderLogin = (req,res)=>{
    // res.render('./users/login');
}

module.exports.login = async (req,res)=>{
    // console.log("Succesfully in")
    // req.flash('success',`Welcome back, ${req.body.username}`)
    const redUrl = req.session.returnTo || '/threads'
    delete req.session.returnTo;
    res.send({log:true, loggedInUser : req.user})
    // res.redirect(redUrl)
}

module.exports.logout = (req,res)=>{
    req.logout();
    // req.flash('success', 'Successfully logged out')
    res.send({loggedInUser : req.loggedInUser})
} 