const express = require('express');
const router = express.Router();

// Article Model
let Website = require('../models/website');

// Add Route
router.get('/add', function(req, res){
  res.render('add_website', {
    title:'Add Website'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    console.log(errors)
    res.render('add_website', {
      title:'Add Website',
      errors:errors
    });
  } else {
    let website = new Website();
    website.title = req.body.title;
    website.url = req.body.url;
    website.description = req.body.description;

    website.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','website Added');
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
