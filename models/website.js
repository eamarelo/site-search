var mongoose = require('mongoose');
var searchPlugin = require('mongoose-search-plugin');

let websiteSchema =  mongoose.Schema({
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
  },
  tags: [String]
});

websiteSchema.plugin(searchPlugin, {
  fields: ['title', 'url', 'description']
});

  let Website = module.exports = mongoose.model('Website', websiteSchema);
