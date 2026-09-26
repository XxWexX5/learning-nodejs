import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'application/json');

  const { url, method } = req;

  if (url === '/users' && method === 'GET') {
    return res.end(JSON.stringify(users));
  }

  if (url === '/users' && method === 'POST') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    });

    return res.end('Criação de usuário');
  }

  if (url === '/users' && method === 'PUT') {
    return res.end('Atualização de usuário');
  }

  if (url === '/users' && method === 'DELETE') {
    return res.end('Remoção de usuário');
  }

  res.end('Hello World!');
});

server.listen(3333, () => {
  console.log('Server is running on port 3333');
});
