const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comments');

const imageSchema = new Schema({
        url:String,
        filename:String     
})

imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200')
})

const postSchema = new Schema({
    title:String,
    body:String,
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    // author:String,
    comments: [
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    isEdited:Boolean,
    isDeleted:Boolean,
    images:[imageSchema],
});

postSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await comments.deleteMany({_id:{$in : doc.reviews}})
    }
})

module.exports = mongoose.model('Post',postSchema);