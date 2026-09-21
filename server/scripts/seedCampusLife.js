const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const CampusLifeScroll = require('../models/campus-life/campus-life-scroll.model');
const CampusLifeGallery = require('../models/campus-life/campus-life-gallery.model');

const scrollItems = [
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/computerlab.jpg',
        title: 'Modern High-Tech Laboratories',
        description: 'Equipped with cutting-edge computing systems, advanced network infrastructure, and modern lab facilities providing hands-on technical skill development and practical exposure.',
        order: 1
    },
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/library.jpg',
        title: 'Central Library & Knowledge Hub',
        description: 'A comprehensive repository featuring thousands of academic texts, national and international journals, periodicals, and e-learning resources fostering research and intellectual curiosity.',
        order: 2
    },
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/club.jpg',
        title: 'Vibrant Clubs & Cultural Fests',
        description: 'From SVASC Diwas and Star Night to Freshers Day and festival celebrations, providing dynamic platforms for students to showcase artistic talents, creativity, and leadership.',
        order: 3
    },
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/sports1.jpg',
        title: 'Sports, Fitness & Athletics',
        description: 'Sprawling grounds for cricket, football, volleyball, track and field, and indoor facilities nurturing athletic spirit, discipline, teamwork, and healthy lifestyle habits.',
        order: 4
    },
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/dji_0589.jpg',
        title: 'Eco-Friendly Green Campus',
        description: 'Nestled amidst lush coconut groves and scenic greenery at Othakuthirai, Gobichettipalayam, offering a serene, inspiring, and eco-conscious atmosphere for holistic education.',
        order: 5
    }
];

const galleryItems = [
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/dance.jpg',
        name: 'Cultural Celebrations',
        description: 'Fine Arts & Dance',
        order: 1
    },
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/computerlab.jpg',
        name: 'High-Tech Computing Labs',
        description: 'Practical Training',
        order: 2
    },
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/sports.jpg',
        name: 'Sports & Athletics',
        description: 'Physical Fitness & Games',
        order: 3
    },
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/library.jpg',
        name: 'Central Library',
        description: 'Knowledge & Research Hub',
        order: 4
    },
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/commities.jpg',
        name: 'Student Committees & Clubs',
        description: 'Leadership & Teamwork',
        order: 5
    },
    {
        image: 'https://res.cloudinary.com/kfaxaxag/image/upload/v1710000000/svasc/hostel.jpg',
        name: 'Campus Hostel',
        description: 'Community Living',
        order: 6
    }
];

async function seedCampusLife() {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            console.error('MONGO_URI is missing in environment variables');
            process.exit(1);
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri);
        console.log('Connected.');

        const existingScrollCount = await CampusLifeScroll.countDocuments();
        if (existingScrollCount === 0) {
            await CampusLifeScroll.insertMany(scrollItems);
            console.log(`Seeded ${scrollItems.length} campus life scroll items.`);
        } else {
            console.log(`CampusLifeScroll already has ${existingScrollCount} items.`);
        }

        const existingGalleryCount = await CampusLifeGallery.countDocuments();
        if (existingGalleryCount === 0) {
            await CampusLifeGallery.insertMany(galleryItems);
            console.log(`Seeded ${galleryItems.length} campus life gallery items.`);
        } else {
            console.log(`CampusLifeGallery already has ${existingGalleryCount} items.`);
        }

        console.log('Done!');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seedCampusLife();
