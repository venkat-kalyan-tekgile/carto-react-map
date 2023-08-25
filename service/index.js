// index.js
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Data received successfully'});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
