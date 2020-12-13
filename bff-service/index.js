const express = require('express');
require('dotenv').config();
const axios = require('axios').default;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, content-type',
    'Access-Control-Allow-Methods': 'PUT'
  });
  next();
});

const memoryCache = {};

const dataFromCache = (req, res, next) => {
  const key = req.originalUrl;
  if (memoryCache[key]) {
    console.log(`Data from cache: ${memoryCache[key].body}`);
    res.send(memoryCache[key].body);
  } else {
    res.sendResponse = res.send;
    res.send = body => {
      memoryCache[key] = { body };
      console.log(`Data to cache: ${memoryCache[key].body}`);
      res.sendResponse(body);
      setTimeout(() => memoryCache[key] = null, 1000 * 60 * 2);
    };
    next();
  }
};

app.get('/products', dataFromCache, (req, res, next) => {
  next();
})

app.all('/*', (req, res) => {
  console.log('originalUrl: ', req.originalUrl);
  console.log('method: ', req.method);
  console.log('body: ', req.body);

  const recipient = req.originalUrl.split('/')[1];
  console.log('recipient: ', recipient);

  const recipientUrl = process.env[recipient];
  console.log('recipientUrl: ', recipientUrl);
  if (recipientUrl) {
    const axiosConfig = {
      method: req.method,
      url: `${recipientUrl}${req.originalUrl}`,
      ...(Object.keys(req.body || {}).length > 0 && {data: req.body})
    };

    console.log('axiosConfig: ', axiosConfig);

    axios(axiosConfig)
    .then(response => {
      console.log('response from recipient: ', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.log('some error: ', JSON.stringify(error));

      if (error.response) {
        const { status, data } = error.response;
        res.status(status).json(data);
      } else {
        res.status(500).json({error: error.message});
      }
    });
  } else {
    res.status(502).json({error: 'Cannot process request'});
  }
});

app.listen(PORT, () => {
  console.log(`bff servise listening at http://localhost:${PORT}`);
})