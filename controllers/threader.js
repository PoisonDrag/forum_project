const Threads = require('../models/thread')
const Posts = require('../models/post')
const mongoose = require('mongoose');

module.exports.renderThread = async(req, res)=>{
    // if(!mongoose.isValidObjectId(req.params.id)){
    //     req.flash('error','Cannot find that thread!');
    //     return res.send({threads:[]})
    // }
    // else{
    const threads = await Threads.find({}).populate({
        path:'posts',
        populate:{path:'author'}
    }).populate('author');
    // console.log(threads)
    res.send({thread: {threads}})
    // res.send({thread: 'Threads'})
    // }
}

module.exports.newThread = async (req, res)=>{
    const newThread = new Threads(req.body);
    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
    // console.log(newcamp.images)
    console.log(req.user)
    newThread.author = req.user;
    await newThread.save();
    // console.log(newThread._id);
    const threads = await Threads.find({})
    req.flash('success', 'Successfully made a new Thread!');
    res.send({thread:{threads}})
}