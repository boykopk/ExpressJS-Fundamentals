const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/mongo-db-playground', {useNewUrlParser: true});

  let database = mongoose.connection;

  database.once('open', (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Connected to database!');
  });

  database.once('error', (err) => {
    console.log(err);
  })
};