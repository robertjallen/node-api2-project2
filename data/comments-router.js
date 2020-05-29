const express = require('express');
const db = require('../data/db.js');

const router = express.Router()


//------------------------------------------------------------------------
//                     READ
//------------------------------------------------------------------------
router.get('/', (req, res) => {
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
//                     POST
//------------------------------------------------------------------------
router.post('/', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
  const changes = req.body;
  db.update(req.params.id, changes)
  .then(post => {
    if (post) {
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

module.exports = router;