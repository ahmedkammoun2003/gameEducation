const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

mongoose.connect(process.env.mongoAPI)
  .then(() => console.log('Connected to MongoDB database'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to my Express server!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
