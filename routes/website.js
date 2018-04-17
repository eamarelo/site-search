const express = require('express');
const router = express.Router();

// website Model
let Website = require('../models/website');

router.get('/add', function(req, res){
  res.render('add_website', {
    title:'Add website'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title','Title is required').notEmpty();
  //req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_website', {
      title:'Add website',
      errors:errors
    });
  } else {
    let website = new Website();
    website.title = req.body.title;
    website.author = req.user._id;
    website.body = req.body.body;

    website.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Website Added');
        res.redirect('/');
      }
    });
  }
});

// Get Single Article
router.get('/:id', function(req, res){
  Website.findById(req.params.id, function(err, website){
    User.findById(website.author, function(err, user){
      res.render('website', {
        website:website,
        author: user.name
      });
    });
  });
});

module.exports = router;
