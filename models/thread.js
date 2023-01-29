const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./post');

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
    posts: [
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    images:[imageSchema],
});

threadSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({_id:{$in : doc.reviews}})
    }
})

module.exports = mongoose.model('Thread',threadSchema);