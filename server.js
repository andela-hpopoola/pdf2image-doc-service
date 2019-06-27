const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 4001;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use morgan to log requests to the console
app.use(morgan('dev'));

app.get('/', (request, response) =>
  response.status(200).json({ msg: 'Welcome to PDF Convert Microservice' })
);

app.listen(port, () => {
  console.info(`Started up at port port ${port}`);
});

module.exports = app;
