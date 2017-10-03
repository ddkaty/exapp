var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/blog/html/', function(req, res, next) {


  fs.readFile('public/blog/html/bloglist.txt','utf-8',function(err,data){  
    if(err){  
        console.error(err);  
    }  
    else{  
      var adata = {}
      data.split("\n").forEach(function(item){
        aspl = item.split(",") ;          
        adata[aspl[0]] = aspl[1] ;          
      })

      res.render('artlist', {titale:'Ulysses输出归档', alist:adata});
    }      
  }); 

});

module.exports = router;
