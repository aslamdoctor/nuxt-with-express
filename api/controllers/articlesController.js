const Article = require('../models/articles');

// Get all
module.exports.list = function (req, res, next) {
  Article.find({}, function(err, articles){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json(articles);
  });
}

// Get one
module.exports.show = function(req, res) {
  var id = req.params.id;
  Article.findOne({_id: id}, function(err, article){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      if(!article) {
          return res.status(404).json({
              message: 'No such record'
          });
      }
      return res.json(article);
  });
}

// Create
module.exports.create = function(req, res) {
  var article = new Article({
      title : req.body.title,
      author : req.body.author,
      body : req.body.body,
  })

  article.save(function(err, article){
      if(err) {
          return res.status(500).json({
              message: 'Error saving record',
              error: err
          });
      }
      return res.json({
          message: 'saved',
          _id: article._id
      });
  })
}


// Update
module.exports.update = function(req, res) {
  var id = req.params.id;
  Article.findOne({_id: id}, function(err, article){
      if(err) {
          return res.status(500).json({
              message: 'Error saving record',
              error: err
          });
      }
      if(!article) {
          return res.status(404).json({
              message: 'No such record'
          });
      }

      article.title =  req.body.title ? req.body.title : article.title;
      article.author =  req.body.author ? req.body.author : article.author;
      article.body =  req.body.body ? req.body.body : article.body;

      article.save(function(err, article){
          if(err) {
              return res.status(500).json({
                  message: 'Error getting record.'
              });
          }
          if(!article) {
              return res.status(404).json({
                  message: 'No such record'
              });
          }
          return res.json(article);
      });
  });
}


// Delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  Article.findByIdAndRemove(id, function(err, article){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      return res.json(article);
  });
}
