'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const app = express();

app.set('view engine', 'pug');
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());


const {userRouter} = require('./routes/index');

app.use('/users', userRouter);


app.get('/', (req, res) => {
  res.render('index', {
    apiUrl: req.apiGateway ?
        `https://${req.apiGateway.event.headers.Host}/${req.apiGateway.event.requestContext.stage}`
        : 'http://localhost:3000'
  });
});

app.get('/sam', (req, res) => {
  res.sendFile(`${__dirname}/sam-logo.png`);
});





// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)

// Export your express server so you can import it in the lambda function.
module.exports = app;
