import express from 'express';
import bodyParser from 'body-parser';
import { 
  requestGet,
  requestPost,
  requestPostAudio,
  QueryStringObject,
} from './dreamsClient';

const server = express();
const port = 3000;

server.use(express.json());
server.use(bodyParser.raw());

// requires /cm/dev/admin perms sadly :(
server.post('/api/audio/import', async (req, res) => {
  const filename = req.header('x-filename');
  const dreamsResponse = await requestPostAudio(req.path, filename, req.body);
  res.status(dreamsResponse.status);
  res.set(dreamsResponse.headers);
  res.send(dreamsResponse.data);
});

server.get('/*', async (req, res) => {
  const dreamsResponse = await requestGet(req.path, req.query as QueryStringObject);
  res.status(dreamsResponse.status);
  res.set(dreamsResponse.headers);
  res.send(dreamsResponse.data);
});

server.post('/*', async (req, res) => {
  const dreamsResponse = await requestPost(req.path, req.body);
  res.status(dreamsResponse.status);
  res.set(dreamsResponse.headers);
  res.send(dreamsResponse.data);
});

server.listen(port, () => console.log(`Dreams API server running on http://localhost:${port}`));