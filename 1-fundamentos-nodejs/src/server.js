import http from 'node:http';
import { json } from './middlewares/json.js';

const users = [];

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  if (url === '/users' && method === 'GET') {
    return res.end(JSON.stringify(users));
  }

  await json(req, res);

  if (url === '/users' && method === 'POST') {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end(JSON.stringify({ message: 'User created' }));
  }

  if (url === '/users' && method === 'PUT') {
    return res.end(JSON.stringify({ message: 'User updated' }));
  }

  if (url === '/users' && method === 'DELETE') {
    return res.end(JSON.stringify({ message: 'User deleted' }));
  }

  res.writeHead(404).end(JSON.stringify({ message: 'Not found' }));
});

server.listen(3333, () => {
  console.log('Server is running on port 3333');
});
