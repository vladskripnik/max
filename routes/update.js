const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = 'pg://postgres:@localhost:5432/regist';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('update.html', { root: __dirname });
});

module.exports = router;


