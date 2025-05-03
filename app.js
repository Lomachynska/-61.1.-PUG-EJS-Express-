const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Підключення шаблонізаторів
app.engine('pug', require('pug').__express); // Підключаємо pug
app.engine('ejs', require('ejs').__express); // Підключаємо ejs

// Статичні файли (наприклад, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// ==== PUG ====
app.set('view engine', 'pug'); // Для PUG
app.set('views', path.join(__dirname, 'views', 'pug')); // Вказуємо папку для PUG

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  res.render('users', { users });  // Повертає pug шаблон
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`
  };
  res.render('userDetails', { user });  // Повертає pug шаблон
});

// ==== EJS ====
app.set('view engine', 'ejs'); // Для EJS
app.set('views', path.join(__dirname, 'views', 'ejs')); // Вказуємо папку для EJS

app.get('/articles', (req, res) => {
  const articles = [
    { id: 1, title: 'Article 1' },
    { id: 2, title: 'Article 2' }
  ];
  res.render('articles', { articles });  // Повертає ejs шаблон
});

app.get('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  const article = {
    id: articleId,
    title: `Article ${articleId}`,
    content: `This is the content of article ${articleId}`
  };
  res.render('articleDetails', { article });  // Повертає ejs шаблон
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
