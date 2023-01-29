const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Post = require('./post2')
const commentSchema = new Schema({
    body :String,
    author : String,
    isEdited: Boolean,
    isDeleted: Boolean,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
       type:Schema.Types.ObjectId,
       ref:'Post2'
    },
    replyAuth:String,
    replyBody:String
})

module.exports = mongoose.model("Comment2", commentSchema);