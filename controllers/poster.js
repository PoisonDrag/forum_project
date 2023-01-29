const Posts = require('../models/post')
const Threads = require('../models/thread')
const Comments = require('../models/comments')

module.exports.renderPost = async(req, res)=>{
    const posts = await Posts.find({}).populate({
        path:'comments',
        populate:{path:'author'}
    }).populate('author');
    console.log("post rendered")
    res.send({post: {posts}})
    // res.send({thread: 'Threads'})
}

module.exports.renderComments = async(req, res)=>{
    const comments= await Comments.find({}).populate({path:"author"})
    res.send({comment: {comments}})
    // res.send({thread: 'Threads'})
}

module.exports.newPost = async (req, res)=>{
    const newPost = new Posts(req.body.post);
    newPost.author = req.user;
    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
        // console.log(newcamp.images)
        // newPost.author = req.user._id;
    const thread = await Threads.findById(req.body.thread._id)
    console.log("post added")
    thread.posts.push(newPost);
    await newPost.save();
    await thread.save();
    res.send(`Post added`)
}
module.exports.editPost = async (req, res)=>{
    const editPost = await Posts.findByIdAndUpdate(req.body.post._id, {body : req.body.post.body, title:req.body.post.title, isEdited:true} );
    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
        // console.log(newcamp.images)
        // newPost.author = req.user._id;
    // const thread = await Threads.findById(req.body.thread._id)
    console.log("post edited")
    await editPost.save();
    console.log(editPost)
    // await thread.save();
    res.send(`Post added`)
}
module.exports.deletePost = async (req, res)=>{
    const reqpost = await Posts.findById(req.body.delPost);
    await Comments.deleteMany({_id:{$in: reqpost.comments}})
    const delPost = await Posts.findByIdAndUpdate(req.body.delPost, {body : "This Post has been Deleted by its creator", isEdited:false, isDeleted:true, comments:[]});
    // newcamp.images = req.files.map(f=>({url: f.path, filename: f.filename}));
        // console.log(newcamp.images)
        // newPost.author = req.user._id;
    // const thread = await Threads.findById(req.body.thread._id)
    console.log("post deleted")
    await delPost.save();
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
    post.comments.push(newComment);
    await newComment.save();
    await post.save();
    res.send(`Post added`)
}

module.exports.deleteComment = async(req,res)=>{
    const allComs = await Comments.find({})
    const delCom = allComs[req.body.i]
    // req.body.post.comments
    const delId = delCom._id
    // const comment = await Comments.findOneAndUpdate({body : delCom.body},{body:"This comment was deleted"})
    // const comment = await Comments.findByIdAndUpdate(delId,{body:"This comment was deleted"})
    // const post = await Posts.findOneAndUpdate({post: post},{post.comments: ""})
    // const post = await Posts.findById(req.body.post._id)
    const reqpost = req.body.post._id
    const post = await Posts.findById(reqpost)
    const reqDelPost = post.comments[req.body.i]._id;
    // console.log(reqDelPost)
    // console.log("comment to be deleted is ", allComs);
    const comment = await Comments.findByIdAndUpdate(reqDelPost,{body:"This comment was deleted", isDeleted:true})
    const newDelId = comment._id;
    post.comments.map((com,i)=>{
        if(com === delId){
            // console.log(com)
            post.comments[i] = newDelId}
    })
    await post.save()
    // console.log(post)
    // console.log()
    await comment.save();
    // console.log(Comments.find({}))
}
module.exports.editComment = async(req,res)=>{
    const allComs = await Comments.find({})
    // const com = allComs[req.body.i]
    // const delId = delCom._id
    // console.log(req.body.data.post)
    const reqpost = req.body.data.post._id
    const post = await Posts.findById(reqpost)
    const reqEditPost = post.comments[req.body.data.i]._id;
    const comment = await Comments.findByIdAndUpdate(reqEditPost,{body:req.body.data.comEdit, isEdited:true})
    const newDelId = comment._id;
    // post.comments.map((com,i)=>{
        //     if(com === ){
            //         console.log(com)
            //         post.comments[i] = newDelId}
            // })
            await post.save()
            // console.log(post)
            // // console.log()
            await comment.save();
            // console.log(Comments.find({}))
            console.log("comment edited is ", comment);
}