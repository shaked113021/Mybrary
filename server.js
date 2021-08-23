const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

const port = process.env.port || 5000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');

app.use(expressLayouts);

app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));