import http from 'node:http';

const users = [];

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-type', 'application/json');

  const { url, method } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    const fullStreamContent = JSON.parse(Buffer.concat(buffers).toString());

    req.body = fullStreamContent;
  } catch (error) {
    req.body = null;
  }

  if (url === '/users' && method === 'GET') {
    return res.end(JSON.stringify(users));
  }

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
