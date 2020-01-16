const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema ({
  title: { type: String, required: true, index: { unique: true } },
  author: { type: String, required: true },
  body: { type: String, required: true },
});

module.exports = mongoose.model('Article', Article)
