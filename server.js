const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const pdf = require('./controllers/pdf');
const upload = require('./controllers/upload');
const middleware = require('./controllers/middleware');

// Get all environment variables
require('dotenv').config();

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 4001;

//enable cors
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use morgan to log requests to the console
app.use(morgan('dev'));

app.get('/', (req, res) =>
  res.status(200).json({ msg: 'Welcome to PDF Convert Microservice' })
);

app.post(
  '/extract-text',
  middleware.checkUserAuth,
  upload.pdf,
  pdf.extract_text
);
app.post(
  '/convert-to-images',
  middleware.checkUserAuth,
  upload.pdf,
  pdf.convert_to_images
);

app.listen(port, () => {
  console.info(`Started up at port ${port}`);
});

module.exports = app;
