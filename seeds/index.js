const mongoose = require('mongoose'); 
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<50; i++) {
        const random1000 = Math.floor(Math.random() *1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '68247db8c56f5c577c9d4d83',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam alias nihil hic autem commodi fuga! Veniam aspernatur dolore possimus porro reprehenderit dignissimos quo et esse eos perspiciatis cupiditate facilis tempora amet perferendis odio, repudiandae vero su',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})