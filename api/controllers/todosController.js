const Todo = require('../models/Todo');
const validator = require('express-validator');

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
module.exports.create = [
  // validations rules
  validator.body('task', 'Please enter Task').isLength({ min: 1 }),
  validator.body('task').custom(value => {
    return Todo.findOne({task:value}).then(todo => {
      if (todo !== null) {
        return Promise.reject('Task already in use');
      }
    })
  }),
  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var todo = new Todo({
        task : req.body.task,
        status : req.body.status,
    })

    // save record
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
]


// Update
module.exports.update = [
  // validation rules
  validator.body('task', 'Please enter Task').isLength({ min: 1 }),
  validator.body('task').custom( (value, {req}) => {
    return Todo.findOne({ task:value, _id:{ $ne: req.params.id } })
      .then( todo => {
      if (todo !== null) {
        return Promise.reject('Task already in use');
      }
    })
  }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

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

        // initialize record
        todo.task =  req.body.task ? req.body.task : todo.task;
        todo.status =  req.body.status ? req.body.status : todo.status;

        // save record
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
]


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
