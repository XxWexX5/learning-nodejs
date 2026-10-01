import http from 'node:http';
import { Database } from './database.js';
import { json } from './middlewares/json.js';

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  if (url === '/users' && method === 'GET') {
    const users = database.select('users');

    return res.end(JSON.stringify(users));
  }

  await json(req, res);

  if (url === '/users' && method === 'POST') {
    const { name, email } = req.body;

    const user = {
      id: 1,
      name,
      email,
    };

    database.insert('users', user);

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
