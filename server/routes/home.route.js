const express = require('express');
const router = express.Router();
const valueSlideController = require('../controllers/home/value-slide.controller');
const blogController = require('../controllers/home/blog.controller');
const alumniSliderController = require('../controllers/home/alumni-slider.controller');
const eventsController = require('../controllers/home/svasc-events.controller');
const homeHeroSlideController = require('../controllers/home-hero-slide.controller');
const upload = require('../middlewares/uploadMiddleware');

// Hero Slide routes
router.get('/hero-slides', homeHeroSlideController.getAllSlides);
router.post('/hero-slides', upload.single('src'), homeHeroSlideController.createSlide);
router.put('/hero-slides/:id', upload.single('src'), homeHeroSlideController.updateSlide);
router.delete('/hero-slides/:id', homeHeroSlideController.deleteSlide);

// Value Slide routes
router.get('/value-slides', valueSlideController.getAllSlides);
router.post('/value-slides', upload.single('backgroundImage'), valueSlideController.createSlide);
router.put('/value-slides/:id', upload.single('backgroundImage'), valueSlideController.updateSlide);
router.delete('/value-slides/:id', valueSlideController.deleteSlide);

// Blog routes
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', upload.single('image'), blogController.createBlog);
router.put('/blogs/:id', upload.single('image'), blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);

// Alumni Slider routes
router.get('/alumni-slider', alumniSliderController.getAllAlumni);
router.get('/alumni-slider/:id', alumniSliderController.getAlumniById);
router.post('/alumni-slider', upload.single('image'), alumniSliderController.createAlumni);
router.put('/alumni-slider/:id', upload.single('image'), alumniSliderController.updateAlumni);
router.delete('/alumni-slider/:id', alumniSliderController.deleteAlumni);

// SVASC Events routes
router.get('/events', eventsController.getAllEvents);
router.get('/events/:id', eventsController.getEventById);
router.post('/events', upload.single('image'), eventsController.createEvent);
router.put('/events/:id', upload.single('image'), eventsController.updateEvent);
router.delete('/events/:id', eventsController.deleteEvent);

module.exports = router;
