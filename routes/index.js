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
          websites: templateWebsites.websites
        });
    }
  });
});

router.post("/", function Query(req, res, cb) {
  if(req.body.searchType =='website'){
      var query = req.body.searchText;
      Website.search(query, {title: 1}, {
        conditions: {title: {$exists: true}},
        sort: {title: 1},
        limit: 10
      }, function(err, data) {
        // array of finded results
        console.log('data results', data.results);

        res.render('index', {
          titleResult: 'Résultats Websites',
          result: data.results
        });

        if(err){
          console.log('error :');
          console.log(err);
        }
      });
  }
  else if(req.body.searchType =='article'){
      var query = req.body.searchText;
      Article.search(query, {title: 1}, {
        conditions: {title: {$exists: true}},
        sort: {title: 1},
        limit: 10
      }, function(err, data) {
        // array of finded results
        console.log('data results', data.results);
        
        res.render('index', {
          titleResult: 'Résultats Articles',
          result: data.results
        });

        if(err){
          console.log('error :');
          console.log(err);
        }
      });
  }
});

module.exports = router;
