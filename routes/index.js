var express = require('express');
var router = express.Router();

let Article = require('../models/article');
let Website = require('../models/website');
let templateArticles;
let templateWebsites;

/* GET home page. */
router.get('/', function(req, res, next) {
   Article.find({}, function(err, articles){
    if(err){
      console.log(err)
    } else {
      console.log(articles[0])
    templateArticles = {
        title:'Articles',
        articles: articles
      };
    }
  });

  Website.find({}, function(err, websites){
    if(err){
      console.log(err);
    } else {
      console.log('websites', websites)
      templateWebsites = {
          title1:'Websites',
          websites: websites
        };
        res.render('index', {
          title: 'Articles et Websites en base de données',
          titleArticles: templateArticles.title,
          titleWebsites:templateWebsites.title1,
          articles: templateArticles.articles,
          websites: templateWebsites.websites,
        });
    }
  });
});

module.exports = router;
