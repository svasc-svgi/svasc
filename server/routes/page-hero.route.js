const express = require('express');
const router = express.Router();
const pageHeroController = require('../controllers/page-hero.controller');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', pageHeroController.getAllHeroes);
router.get('/:pageKey', pageHeroController.getHeroByPage);
router.put('/:pageKey', upload.single('image'), pageHeroController.updateOrCreateHero);

module.exports = router;
