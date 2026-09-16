const express = require('express');
const router = express.Router();
const programsController = require('../controllers/programs.controller');

// Create a new program
router.post('/', programsController.createProgram);

// Get all programs (flat list)
router.get('/', programsController.getAllPrograms);

// Get grouped programs for frontend "Tabs" view
router.get('/grouped', programsController.getGroupedPrograms);

// Get single program details by Slug
router.get('/details/:slug', programsController.getProgramBySlug);

// Update a program
router.put('/:id', programsController.updateProgram);

// Delete a program
router.delete('/:id', programsController.deleteProgram);

module.exports = router;
