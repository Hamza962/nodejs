'use strict';

const express = require('express');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('CI/CD iDeployed On Request From Developer');
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
