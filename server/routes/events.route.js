const express = require('express');
const router = express.Router();
const eventsGridController = require('../controllers/events/grid.controller');
const eventsMarqueeController = require('../controllers/events/marquee.controller');
const upload = require('../middlewares/uploadMiddleware');

// Events Grid routes
router.get('/grid', eventsGridController.getAllEventsGrid);
router.get('/grid/:id', eventsGridController.getEventGridById);
router.post('/grid', upload.single('image'), eventsGridController.createEventGrid);
router.put('/grid/:id', upload.single('image'), eventsGridController.updateEventGrid);
router.delete('/grid/:id', eventsGridController.deleteEventGrid);

// Events Marquee routes
router.get('/marquee', eventsMarqueeController.getAllEventsMarquee);
router.get('/marquee/:id', eventsMarqueeController.getEventMarqueeById);
router.post('/marquee', upload.single('image'), eventsMarqueeController.createEventMarquee);
router.put('/marquee/:id', upload.single('image'), eventsMarqueeController.updateEventMarquee);
router.delete('/marquee/:id', eventsMarqueeController.deleteEventMarquee);

module.exports = router;
