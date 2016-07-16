'use strict';

const express = require('express');
const router = express.Router();

router.use('/crud', require('./cruds'));
router.use('/user', require('./users'));
router.use('/bluemix', require('./bluemix'));

module.exports = router;
