const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = 'pg://postgres:@localhost:5432/regist';

/* GET home page. */

module.exports = router;

router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: __dirname });
});

router.get('/api/v1/regist', function(req, res, next) {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', function(row)  {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});
router.put('/api/v1/regist/:todo_id', function(req, res, next) {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.todo_id;
  // Grab data from http request
  const data = {domain: req.body.domain, email:req.body.email.text,image:req.body.image, login: req.body.login.text, name:req.body.name.text, password:req.body.password.text, role: req.body.role, surname: req.body.surname.text};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE items SET domain=($1), email=($2),image=($3),login=($4),name=($5),password=($6),role=($7),surname=($8)  WHERE id=($9)',
      [data.domain , data.email,data.image, data.login, data.name, data.password, data.role, data.surname, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM items ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});
router.post('/api/v1/regist', function(req, res, next) {
  const results = [];
  // Grab data from http request
  const data = {domain: req.body.domain, email:req.body.email.text, login: req.body.login.text, name:req.body.name.text, password:req.body.password.text, role: req.body.role, surname: req.body.surname.text};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO items(domain,email,login,name,password,role,surname,time) values($1,$2,$3,$4,$5,$6,$7,statement_timestamp())',
      [data.domain , data.email, data.login, data.name, data.password, data.role, data.surname]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});
router.delete('/api/v1/regist/:todo_id', function(req, res, next)  {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.todo_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM items WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});