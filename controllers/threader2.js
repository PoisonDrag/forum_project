const Threads = require('../models/thread2')
// const Posts = require('../models/post2')
const mongoose = require('mongoose');

module.exports.renderThread = async(req, res)=>{
    const threads= await Threads.find({}).populate({path:"author"});
    console.log(req.user)
    res.send({thread: {threads}})
    // res.send({thread: 'Threads'})
    // }
}

module.exports.newThread = async (req, res)=>{
    const newThread = new Threads(req.body.newThread);
    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
    // console.log(newcamp.images)
    console.log(req.user)
    newThread.author = req.user;
    if(mongoose.isValidObjectId(req.body.log._id)){
    await newThread.save();}
    // console.log(newThread._id);
    const threads = await Threads.find({})
    req.flash('success', 'Successfully made a new Thread!');
    res.send({thread:{threads}})
}