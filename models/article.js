var mongoose = require('mongoose');
var searchPlugin = require('mongoose-search-plugin');

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

articleSchema.plugin(searchPlugin, {
  fields: ['title']
});

  var Model = mongoose.model('Article', articleSchema);
  Model.search('some query', {title: 1}, {
    conditions: {title: {$exists: true}},
    sort: {title: 1},
    limit: 10
  }, function(err, data) {
    // array of finded results
    console.log('data results', data.results);
    // count of all matching objects
    console.log('data totalCount', data.totalCount);
  });

let Article = module.exports = mongoose.model('Article', articleSchema);
