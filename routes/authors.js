const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All Authors route
router.get('/', async (req, res) => {
  let failed = false;
  let searchOptions = {};
  if (req.query.name && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  const authors = await Author.find(searchOptions).catch(error => failed = true);

  if (failed) {
    res.redirect('/')
  } else {
    res.render('authors/index', { 
      authors: authors,
      searchOptions: searchOptions
    });
  }

  
});

// New Author
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
})

// Create author
router.post('/', async (req, res) => {
  let failed = false;
  const author = new Author({
    name: req.body.name
  });

  const newAuthor = await author.save().catch(error => failed = true);

  if (failed) {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error Creating author'
    });
  } else {
    res.redirect('authors');
  }
});
module.exports = router;