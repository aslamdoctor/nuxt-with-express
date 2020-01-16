const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema ({
  task: { type: String, required: true, index: { unique: true } },
  status: { type: Boolean, required: true },
});

module.exports = mongoose.model('Todo', Todo)
