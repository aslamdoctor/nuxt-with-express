const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb', {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useFindAndModify: false,
                            useCreateIndex: true
                          });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("MongoDB Connected...");
});

module.exports = db
