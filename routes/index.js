const express = require('express');
const router = express.Router();
const { bulkInsert, getAll, bulkDelete, bulkUpdate } = require('../controllers/dataController');

router.post('/api/data', bulkInsert);
router.get('/api/data', getAll);
router.delete('/api/data', bulkDelete);
router.put('/api/data', bulkUpdate);

module.exports = router;