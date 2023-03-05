const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.Promise = global.Promise;

const app = require('./app');

// mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000, () => {
      console.log('Server running on port: 3000');
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
