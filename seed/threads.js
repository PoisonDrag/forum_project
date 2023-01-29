const mongoose = require('mongoose');
const threads = require('../models/thread')
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
        await threads.deleteMany({title:undefined});
        const thread = new threads({
                author:"XYZ",
                title: `Great`,
                // images:[{
                //         url: 'https://res.cloudinary.com/poison04/image/upload/v1626422893/YelpCamp/y6uazl51ctv6llkc1vec.png',
                //         filename: 'YelpCamp/y6uazl51ctv6llkc1vec'
                //     },
                //     {
                //         url: 'https://res.cloudinary.com/poison04/image/upload/v1626422893/YelpCamp/jzv22p446ue79jcbf4mx.png',
                //         filename: 'YelpCamp/jzv22p446ue79jcbf4mx'
                //     }]
            })
            await thread.save();
        // }
    }
    catch(err){
        console.log(err);
    }
}

seedDb();