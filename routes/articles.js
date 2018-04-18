const express = require('express');
const router = express.Router();

// Article Model
let Article = require('../models/article');

// Add Route
router.get('/add', function(req, res){
  res.render('add_article', {
    title:'Add Article'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    console.log(errors)
    res.render('add_article', {
      title:'Add Article',
      errors:errors
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.url = req.body.url;
    article.description = req.body.description;

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        console.log('flash--------------------------------------------------------------------------')
        req.flash('success','Article Added');
        res.redirect('/');
      }
    });
  }
});

/*
router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
      res.render('article', {
        article:article
      });
    });
});*/

module.exports = router;
