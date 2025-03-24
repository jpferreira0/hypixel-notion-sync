const express = require('express');
const router = express.Router();

//* Main page
const viewController = require('../controllers/controllers');
router.get('/', viewController);

//* Hypixel API
const { hypixelAPI } = require('../controllers/hypixelController');
router.get('/api/hypixel', hypixelAPI);

//* Notion API - Update the page with the amount of items (POST)
const { notionAPI } = require('../controllers/notionController');
router.post('/api/notion', notionAPI);

//* Update .env file with the Notion Page IDs
const { getNotionPagesIDAPI } = require('../controllers/updateNotionPageIDController');
router.get('/api/updateNotionPageID', getNotionPagesIDAPI);

module.exports = router;