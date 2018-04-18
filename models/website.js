var mongoose = require('mongoose');  
searchPlugin = require('mongoose-search-plugin');

var websiteSchema = new mongoose.Schema({  
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

websiteSchema.plugin(searchPlugin, {
	fields: ['title', 'description', 'url']
});

let Website = module.exports = mongoose.model('Website', websiteSchema);