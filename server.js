const express = require('express');
const { requestGet, requestPost } = require('./dreamsClient');

const server = express();
const port = 3000;

server.get('/*', async (req, res) => {
  console.log(req.path, req.query);
  const data = await requestGet(req.path, req.query);
  res.send(data);
});

server.listen(port, () => console.log(`Listening at http://localhost:${port}`));