const Todo = require('../models/Todo');

// Get all
module.exports.list = function (req, res, next) {
  Todo.find({}, function(err, todos){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json(todos);
  });
}

// Get one
module.exports.show = function(req, res) {
  var id = req.params.id;
  Todo.findOne({_id: id}, function(err, todo){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      if(!todo) {
          return res.status(404).json({
              message: 'No such record'
          });
      }
      return res.json(todo);
  });
}

// Create
module.exports.create = function(req, res) {
  var todo = new Todo({
      task : req.body.task,
      status : req.body.status,
  })

  todo.save(function(err, todo){
      if(err) {
          return res.status(500).json({
              message: 'Error saving record',
              error: err
          });
      }
      return res.json({
          message: 'saved',
          _id: todo._id
      });
  })
}


// Update
module.exports.update = function(req, res) {
  var id = req.params.id;
  Todo.findOne({_id: id}, function(err, todo){
      if(err) {
          return res.status(500).json({
              message: 'Error saving record',
              error: err
          });
      }
      if(!todo) {
          return res.status(404).json({
              message: 'No such record'
          });
      }

      todo.task =  req.body.task ? req.body.task : todo.task;
      todo.status =  req.body.status ? req.body.status : todo.status;

      todo.save(function(err, todo){
          if(err) {
              return res.status(500).json({
                  message: 'Error getting record.'
              });
          }
          if(!todo) {
              return res.status(404).json({
                  message: 'No such record'
              });
          }
          return res.json(todo);
      });
  });
}


// Delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  Todo.findByIdAndRemove(id, function(err, todo){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      return res.json(todo);
  });
}
