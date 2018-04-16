const express = require('express');
const router = express.Router();
var pg = require('pg');

/* GET api listing */
router.get('/', (req, res) => {
	res.send('api works');
});

router.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

module.exports = router;
