const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const express = require('express'); // Add express for serving static files

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const app = express(); // Create a separate Express app
const imageDirectory = path.join(__dirname, 'images'); // Path to your image directory

app.use('/images', express.static(imageDirectory)); // Serve images from the '/images' route

server.use('/api', app); // Mount the Express app under '/api'

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
