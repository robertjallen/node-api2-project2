const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

//------------------------------------------------------------------------
//                     READ
//------------------------------------------------------------------------
server.get('/api/posts', (req, res) => {
  db.find()
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  });
});
//------------------------------------------------------------------------
//                     READ BY ID
//------------------------------------------------------------------------
server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the Post',
    });
  });
});
//------------------------------------------------------------------------
//                     POST
//------------------------------------------------------------------------
server.post('/api/posts', (req, res) => {
  db.insert(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the Post',
    });
  });
});
//------------------------------------------------------------------------
//                     DELETE BY ID
//------------------------------------------------------------------------

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: `The post ID: ${req.params.id} has been nuked`, id: `${req.params.id}` });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  });
});
//------------------------------------------------------------------------
//                     UPDATE BY ID
//------------------------------------------------------------------------
server.put('/api/posts/:id', (req, res) => {
  const changes = req.body;
  db.update(req.params.id, changes)
  .then(post => {
    if (post) {
      console.log(post)
      res.status(200).json({post: post, item: changes});
    } else {
      res.status(404).json({ message: 'The Post could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the Post',
    });
  });
});

// // add an endpoint that returns all the messages for a hub
// // add an endpoint for adding new message to a hub

module.exports = server;