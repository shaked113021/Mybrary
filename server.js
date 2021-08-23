if (process.env.NODE_ENV !== 'production') {
  const fs = require('fs');
  const dotenv = require('dotenv');
  dotenv.config(dotenv.parse(fs.readFileSync(`${__dirname}/.env`, { encoding: 'utf-8' })));
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');

app.use(expressLayouts);

app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to DB'));

app.use('/', indexRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));