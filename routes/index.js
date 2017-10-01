var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/blog/html/', function(req, res, next) {
  fs.readdir('public/blog/html/',function (err,files) {
    if (err) {
//        return console.error(err);
      res.send(err);
    }
  //  console.log(files);
    res.render('artlist', { name: 'Tobi' }, function(err, html) {
      res.send(html);
    });
  });
});

module.exports = router;
