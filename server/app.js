const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const expressHandlebars = require('express-handlebars');

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

app.use(compression());

app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 'handlebars' - look for files with .handlebars extension
// defaultLayout - handlebars has its own view, but we want our own
app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));

app.set('view engine', 'handlebars');

// point to the directory where the views are located
app.set('views', `${__dirname}/../views`);

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});

