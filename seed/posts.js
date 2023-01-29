const mongoose = require('mongoose');
const Posts = require('../models/post')
const Threads = require('../models/thread');

// const cities = require('./cities');
// const {places,descriptors} = require('./seedhelpers');

mongoose.connect('mongodb://localhost:27017/socialBackend', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});  

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => { 
    console.log("Database connected");
});

const seedDb = async() => {
    try{
        // await threads.deleteMany({});
        const post = new Posts({
                author:"XYZ",
                title: `Why it is bad`,
                body:"Education quality poor. Campus bad",
                // images:[{
                //         url: 'https://res.cloudinary.com/poison04/image/upload/v1626422893/YelpCamp/y6uazl51ctv6llkc1vec.png',
                //         filename: 'YelpCamp/y6uazl51ctv6llkc1vec'
                //     },
                //     {
                //         url: 'https://res.cloudinary.com/poison04/image/upload/v1626422893/YelpCamp/jzv22p446ue79jcbf4mx.png',
                //         filename: 'YelpCamp/jzv22p446ue79jcbf4mx'
                //     }]

            })
            await post.save();
            var Thread = Threads.schema.obj;
            // console.log(Threads.find({}))
            Thread.posts.push(post)
            await Threads.schema.save();
        // }
    }
    catch(err){
        console.log(err);
    }
}

seedDb();