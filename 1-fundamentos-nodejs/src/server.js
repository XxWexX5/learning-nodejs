import http from 'node:http';

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === '/users' && method === 'GET') {
    return res.end('Listagem de usuários');
  }

  if (url === '/users' && method === 'POST') {
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
