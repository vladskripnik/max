const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = 'pg://postgres:@localhost:5432/regist';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('registration.html', { root: __dirname });
});

module.exports = router;

