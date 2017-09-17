const pg = require('pg');
const conString = 'pg://postgres:123@localhost:5432/image';
const client = new pg.Client(conString);
client.connect();
const query = client.query(
  'CREATE TABLE images(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, image OID)');
query.on('end', function() { client.end(); });