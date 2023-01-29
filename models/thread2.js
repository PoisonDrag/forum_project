const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Post = require('./post2');

const imageSchema = new Schema({
        url:String,
        filename:String     
})

imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200')
})

const threadSchema = new Schema({
    title:String,
    // author:String,
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    // images:[imageSchema],
});

module.exports = mongoose.model('Thread2',threadSchema);