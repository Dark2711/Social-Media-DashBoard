const express = require('express');

require('dotenv').config();

const connectDB = require('./db');
const mainRouter = require('./routes/main.route');
connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1', mainRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
