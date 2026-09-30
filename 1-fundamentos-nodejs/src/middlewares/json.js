export const json = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

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
};
