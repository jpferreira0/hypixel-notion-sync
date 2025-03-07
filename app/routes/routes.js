const express = require('express');
const router = express.Router();

//* Main page
const viewController = require('../controllers/controllers');
router.get('/', viewController);

//* API
const { getData } = require('../controllers/backupController');
router.get('/api/data', getData);

module.exports = router;