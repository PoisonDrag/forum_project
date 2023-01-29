const Posts = require('../models/post2')
const mongoose = require('mongoose');
const Threads = require('../models/thread2')
const Comments = require('../models/comments2')
var cloudinary = require('cloudinary').v2;

module.exports.renderPost = async(req, res)=>{
    const posts = await Posts.find({}).populate({
        path:'thread',
        populate:{path:'author'}
    }).populate('author');
    console.log("post rendered")
    res.send({post: {posts}})
    // res.send({thread: 'Threads'})
}

module.exports.renderComments = async(req, res)=>{
    const comments = await Comments.find({}).populate({
        path:'post',
        populate:{path:'author'}
    }).populate('author');
    // console.log(comments)
    res.send({comment: {comments}})
    // res.send({thread: 'Threads'})
}

module.exports.newPost = async (req, res)=>{
    const newPost = new Posts(req.body.post);
    newPost.author = req.user;
    newPost.images = req.body.imgs.map(f=>({url: f.path, filename: f.name}));
        // console.log(newPost.images)
        // newPost.author = req.user._id;
    const reqThread = await Threads.findById(req.body.thread._id)
    // console.log(newPost)
    // console.log("Files are ", req.files)
    newPost.thread = reqThread; 
    if(mongoose.isValidObjectId(req.body.log._id)){
        await newPost.save();
    }
    await reqThread.save();
    res.send(`Post added`)
}
module.exports.editPost = async (req, res)=>{
    const editPost = await Posts.findByIdAndUpdate(req.body.post._id, {body : req.body.post.body, title:req.body.post.title, isEdited:true} );
    editPost.images = req.body.post.images.map(f=>({url: f.path, filename: f.name}));
    // cloudinary.config({ 
    //     cloud_name: 'poison04', 
    //     api_key: process.env.CLOUDINARY_API, 
    //     api_secret: process.env.CLOUDINARY_SECRET 
    // });
    // req.body.prevImgs.map(img=>{
    //     cloudinary.uploader.destroy(img.url, function(result) { console.log(result) });
    // })
    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
        // console.log(newcamp.images)
        // newPost.author = req.user._id;
    console.log("post edited")
        if(mongoose.isValidObjectId(req.body.log._id)){
    await editPost.save();
        }
    res.send(`Post added`)
}
module.exports.deletePost = async (req, res)=>{
    const reqpost = await Posts.findById(req.body.delPost);
    await Comments.deleteMany({post:reqpost.id})
    const delPost = await Posts.findByIdAndUpdate(req.body.delPost, {body : "This Post has been Deleted by its creator", isEdited:false, isDeleted:true});
    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
        // console.log(newcamp.images)
        // newPost.author = req.user._id;
    // const thread = await Threads.findById(req.body.thread._id)
    console.log("post deleted")
    if(mongoose.isValidObjectId(req.body.log._id)){
    await delPost.save();
    }
    // await thread.save();
    res.send(`Post added`)
}

module.exports.newComment = async (req, res)=>{
    // console.log(req.body.commentData);
    const newComment = new Comments(req.body.commentData);
    newComment.author = req.user;

    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
    // console.log(newcamp.images)
    // newPost.author = req.user._id;
    
    const post = await Posts.findById(req.body.post._id)
    console.log("post changed")
    // const thread = await Threads.findById(req.body.thread._id)
    // console.log(req.body.post._id)
    newComment.post = post;
    if(mongoose.isValidObjectId(req.body.log._id)){
        await newComment.save();
    }
    await post.save();
    res.send(`Post added`)
}

module.exports.deleteComment = async(req,res)=>{
    // console.log(req.body)
    const reqDelComment = req.body.delId;
    if(mongoose.isValidObjectId(req.body.log._id)){
    const comment = await Comments.findByIdAndUpdate(reqDelComment,{body:"This comment was deleted", isDeleted:true})
    await comment.save();}
    // console.log(Comments.find({}))
}
module.exports.editComment = async(req,res)=>{
    // const reqpost = req.body.post._id
    // const post = await Posts.findById(reqpost)
    // const reqEditPost = post.comments[req.body.data.i]._id;
    const i = req.body.data.i
    const reqEditCom = req.body.data.editId;
    // console.log("id is " , reqEditCom)
    if(mongoose.isValidObjectId(req.body.data.log._id)){
    const comment = await Comments.findByIdAndUpdate(reqEditCom,{body:req.body.data.comEdit, isEdited:true})
    await comment.save();
    }
}