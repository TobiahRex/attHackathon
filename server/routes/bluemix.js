'use strict';

const express = require('express');
const router = express.Router();
const watson = require('watson-developer-cloud');
const fs = require('fs');
const path = require('path');

const BM = require('../models/bm');

router.post('/', (req, res) => BM(req.body.human, res.handle));




module.exports = router;

