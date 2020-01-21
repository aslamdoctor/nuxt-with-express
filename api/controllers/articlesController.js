const Article = require('../models/Article');
const validator = require('express-validator');

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
module.exports.create = [
  // validations rules
  validator.body('title', 'Please enter Article Title').isLength({ min: 1 }),
  validator.body('title').custom(value => {
    return Article.findOne({title:value}).then(article => {
      if (article !== null) {
        return Promise.reject('Title already in use');
      }
    })
  }),
  validator.body('author', 'Please enter Author Name').isLength({ min: 1 }),
  validator.body('body', 'Please enter Article Content').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var article = new Article({
        title : req.body.title,
        author : req.body.author,
        body : req.body.body,
    })

    // save record
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
]

// Update
module.exports.update = [
  // validation rules
  validator.body('title', 'Please enter Article Title').isLength({ min: 1 }),
  validator.body('title').custom( (value, {req}) => {
    return Article.findOne({ title:value, _id:{ $ne: req.params.id } })
      .then( article => {
      if (article !== null) {
        return Promise.reject('Title already in use');
      }
    })
  }),
  validator.body('author', 'Please enter Author Name').isLength({ min: 1 }),
  validator.body('body', 'Please enter Article Content').isLength({ min: 1 }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

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

        // initialize record
        article.title =  req.body.title ? req.body.title : article.title;
        article.author =  req.body.author ? req.body.author : article.author;
        article.body =  req.body.body ? req.body.body : article.body;

        // save record
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

]


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
