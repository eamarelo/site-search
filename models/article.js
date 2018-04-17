var mongoose = require('mongoose');  
searchPlugin = require('mongoose-search-plugin');

let articleSchema =  mongoose.Schema({  
  title:{
  	type: String,
  	required: true
  },
  url:{
  	type: String,
  	required: true,
  },
  description:{
  	type: String
  }, 
  created_at:{
  	type: Date,
  	default: Date.now
  }
});

let Article = module.exports = mongoose.model('Article', articleSchema);
