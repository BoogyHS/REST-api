const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
  console.log(config.dbURL)
  return mongoose.connect(config.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};
