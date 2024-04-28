var express = require('express');
var router = express.Router();
var db = require('../utils/db');
/* GET home page. */
router.get('/', function (req, res, next) {
  db.all("SELECT rowid AS id, info FROM lorem", (err, rows) => {
    res.render('index', { title: 'Express', rows });
  });
});

module.exports = router;
