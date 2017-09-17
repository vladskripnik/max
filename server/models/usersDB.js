const pg = require('pg');
const conString = 'pg://postgres:@localhost:5432/regist';
const client = new pg.Client(conString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, domain VARCHAR(40),email VARCHAR(40) not null,image VARCHAR(40), login VARCHAR(40) not null,name VARCHAR(40) not null,password VARCHAR(40) not null,role VARCHAR(40), surname VARCHAR(40) not null, time time without time zone)');
query.on('end', function() { client.end(); });