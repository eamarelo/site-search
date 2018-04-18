var express = require('express');
var router = express.Router();

let Article = require('../models/article');
let Website = require('../models/website');

/* GET home page. */
router.get('/', function(req, res, next) {
   Article.find({}, function(err, articles){
    if(err){
    } else {
      res.render('index', {
        title:'Articles',
        articles: articles
      });
    }
  });

  Website.find({}, function(err, websites){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
		title1:'Websites',
        websites: websites
      });
    }
  });
});

module.exports = router;