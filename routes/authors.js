const express = require('express');
const router = express.Router();

// All Authors route
router.get('/', (req, res) => {
  res.render('authors/index');
});

// New Author
router.get('/new', (req, res) => {
  res.render('authors/new');
})

// Create author
router.post('/', (req, res) => {
  res.send('Create');
});
module.exports = router;