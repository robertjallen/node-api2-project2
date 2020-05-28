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
      res.status(200).json(hub);
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

// server.post('/api/hubs', (req, res) => {
//   Hubs.add(req.body)
//   .then(hub => {
//     res.status(201).json(hub);
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error adding the hub',
//     });
//   });
// });

// server.delete('/api/hubs/:id', (req, res) => {
//   Hubs.remove(req.params.id)
//   .then(count => {
//     if (count > 0) {
//       res.status(200).json({ message: 'The hub has been nuked' });
//     } else {
//       res.status(404).json({ message: 'The hub could not be found' });
//     }
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error removing the hub',
//     });
//   });
// });

// server.put('/api/hubs/:id', (req, res) => {
//   const changes = req.body;
//   Hubs.update(req.params.id, changes)
//   .then(hub => {
//     if (hub) {
//       res.status(200).json(hub);
//     } else {
//       res.status(404).json({ message: 'The hub could not be found' });
//     }
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error updating the hub',
//     });
//   });
// });

// // add an endpoint that returns all the messages for a hub
// // add an endpoint for adding new message to a hub

// server.listen(4000, () => {
//   console.log('\n*** Server Running on http://localhost:4000 ***\n');
// });

module.exports = server;