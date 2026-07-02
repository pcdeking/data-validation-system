const express = require('express');
const router = express.Router();

const {
    createRecord
} = require('../controllers/recordController');

const validateRecord =
require('../middleware/validateRecord');

router.post(
    '/',
    validateRecord,
    createRecord
);

module.exports = router;