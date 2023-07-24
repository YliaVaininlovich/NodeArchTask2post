const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); //парсер для обработки POST запросов

//на главную страницу
app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/submit-form">
    
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <br><br><br>
           
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
      <br><br><br>
      
      <label for="message">Message:</label>
      <textarea id="message" name="message"></textarea>
      <br><br><br>

      <button type="submit">Submit</button>
    </form>
  `);
});

//обработка формы
app.post('/submit-form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (!name || !email || !message) {
    // Если хотя бы одно поле не заполнено, то возвращаем ошибку
    res.send(`
      <p>Error: Все поля обязательны для заполнения</p>
      <form method="POST" action="/submit-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="${name || ''}">
        <br><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="${email || ''}">
        <br><br><br>

        <label for="message">Message:</label>
        <textarea id="message" name="message">${message || ''}</textarea>
        <br><br><br>

        <button type="submit">Submit</button>
      </form>
    `);
  } else {
    // Если все поля заполнены, то отображаем данные
    res.send(`
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `);
  }
});


app.listen(7280, () => {
  console.log('Server is running at 7280');
});