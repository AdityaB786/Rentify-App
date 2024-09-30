const mongoose = require('mongoose');
require('dotenv').config(); // Correctly load environment variables

const mongoUrl = process.env.mongo_Url; // Ensure this matches the .env variable

mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });
