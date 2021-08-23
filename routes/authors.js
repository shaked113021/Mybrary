const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All Authors route
router.get('/', (req, res) => {
  res.render('authors/index');
});

// New Author
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
})

// Create author
router.post('/', (req, res) => {
  const author = new Author({
    name: req.body.name
  });

  author.save((err, newAuthor) => {
    if (err) {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error Creating author'
      })
      } else {
        // res.redirect(`/authors/${newAuthor.id}`);
        res.redirect('authors');
    }
  });
});
module.exports = router;