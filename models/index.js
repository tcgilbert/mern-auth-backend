require('dotenv').config()
const mongoose = require('mongoose');

// Mongo Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

// Mongoose connection object
const db = mongoose.connection;

// setup event listener that will fire on db connection
db.once('open', () => {
  console.log(`Connected to mongoDB at ${db.host}: ${db.port}`);
})

db.on('error', (error) => {
  console.log(`Database error\n ${error}`);
})

// module.exports.User = require('./User')