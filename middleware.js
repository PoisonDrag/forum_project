const schemas = require('./schemas')
const Thread = require('./models/thread');
const Review = require('./models/post');
const AppErr = require('./Utils/AppErr');

module.exports.isLoggedIn = (req,res,next)=>{
        if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in to perform this!')
        return res.redirect('/login'); 
        } 
        next();
}

module.exports.ValidateThread = (req,res,next)=>{
        const threadSchema = schemas.threadSchema.required();
        const {error} = threadSchema.validate(req.body)
        if(error){
                const msg = error.details.map(el=>el.message).join(',') 
                throw new AppErr(msg,400);
        }else{
                next();
        }
        next();
}
module.exports.validatePost = (req,res,next)=>{
        const postSchema = schemas.postSchema.required();
        const {error} = postSchema.validate(req.body)
        if(error){
                const msg = error.details.map(el=>el.message).join(',') 
                throw new AppErr(msg,400);
        }
        next();
}
module.exports.validateComment = (req,res,next)=>{
        const commentSchema = schemas.commentSchema.required();
        const {error} = commentSchema.validate(req.body)
        if(error){
                const msg = error.details.map(el=>el.message).join(',') 
                throw new AppErr(msg,400);
        }
        next();
}

module.exports.isAuthor = async (req,res,next) => {
        const {id} = req.params;
        const post = await Post.findById(id);
        if(!post.author.equals(req.user._id)){
                req.flash('error', 'You dont have permission to do that!');
                return res.redirect(`/campgrounds/${id}`)
        }
        next();
}

module.exports.isCommentAuthor  = async (req,res,next) => {
        const {id, commentId} = req.params;
        const comment = await Comment.findById(commentId);
        if(!comment.author.equals(req.user._id)){
                req.flash('error', 'You dont have permission to do that!');
                return res.redirect(`/campgrounds/${id}`)
        }
        next();
}
