/* eslint-disable linebreak-style */

const express = require('express');

const router = express.Router();
const { getTypes } = require('../controllers/Types');

router.get('/', getTypes);

module.exports = router;
