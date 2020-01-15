const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema ({
  task: { type: String, required: true },
  status: { type: Boolean, required: true },
});

module.exports = mongoose.model('Todo', Todo)
