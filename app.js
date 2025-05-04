const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// === Налаштування статичних файлів (favicon, CSS тощо)
app.use(express.static(path.join(__dirname, 'public')));

// === Налаштування PUG ===
app.engine('pug', require('pug').__express);

// === Налаштування EJS ===
app.engine('ejs', require('ejs').__express);

// === Роут для PUG ===
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Anton Anton' },
    { id: 2, name: 'Anna Anna' }
  ];
  // PUG: views/pug/users.pug
  app.set('views', path.join(__dirname, 'views', 'pug'));
  app.set('view engine', 'pug');
  res.render('users', { users });
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`
  };
  // PUG: views/pug/userDetails.pug
  app.set('views', path.join(__dirname, 'views', 'pug'));
  app.set('view engine', 'pug');
  res.render('userDetails', { user });
});

// === Роут для EJS ===
app.get('/articles', (req, res) => {
  const articles = [
    { id: 1, title: 'Article 1' },
    { id: 2, title: 'Article 2' }
  ];
  // EJS: views/ejs/articles.ejs
  app.set('views', path.join(__dirname, 'views', 'ejs'));
  app.set('view engine', 'ejs');
  res.render('articles', { articles });
});

app.get('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  const article = {
    id: articleId,
    title: `Article ${articleId}`,
    content: `This is the content of article ${articleId}`
  };
  // EJS: views/ejs/articleDetails.ejs
  app.set('views', path.join(__dirname, 'views', 'ejs'));
  app.set('view engine', 'ejs');
  res.render('articleDetails', { article });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
