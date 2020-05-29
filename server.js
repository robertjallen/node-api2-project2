const express = require('express');
const server = express();
const postsRouter = require('./data/posts-router.js');
const commentsRouter = require('./data/comments-router.js');

server.use(express.json());

server.use('/api/posts', postsRouter);
server.use('/api/comments', commentsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});



// // add an endpoint that returns all the messages for a hub
// // add an endpoint for adding new message to a hub

module.exports = server;