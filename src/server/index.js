const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const bodyParser = require('body-parser');

// Config

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use('/', router);

app.use(express.static('dist'));
app.use('/assets', express.static('assets'));
app.use('/public', express.static('public'));

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500);
});

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

mongoose.connection.on('open', () => {
  console.log('Mongodb connected.');
  app.listen(port, () => {
    console.log('Server is listening on port: ', port);
  });
});

mongoose.connection.on('error', (err) => {
  console.log('Mongodb connection error: ', err)
});

