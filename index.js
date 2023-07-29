const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); //парсер для обработки POST запросов

let name ='', email='', message='';
let errorName = '', errorEmail = '', errorMessage = '';

//на главную страницу
app.get('/', (req, res) => {
  res.send(generateForm());
});

//обработка формы
app.post('/submit-form', (req, res) => {
   name = req.body.name;
   email = req.body.email;
  message = req.body.message;
  
  // Если хотя бы одно поле не заполнено, то возвращаем ошибку
  if (!name || !email || !message) { 
    if (!name) errorName = `Error: Не заполнено имя`; else errorName = "";
    if (!email) errorEmail = `Error: Не заполнен адрес электронной почты`; else errorEmail = "";
    if (!message) errorMessage = `Error: Нет комментариев`; else errorMessage = "";
    res.send(generateForm());

  }
  else {
    errorName = '';
    errorEmail = '';
    errorMessage = '';
    
    res.redirect(301, `/submit-result`);
  }
  
});

//правильно заполненная форма
app.get('/submit-result', (req, res) => {
  res.send(`
  <p>Name: ${name}</p>
  <p>Email: ${email}</p>
  <p>Message: ${message}</p>
`);
}
);

app.listen(7280, () => {
  console.log('Server is running at 7280');
});

function generateForm() {
 
  return `
    <form method="POST" action="/submit-form" id="my-form">
      <p style="color:red">${errorName}</p>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" value="${name}">
      <br><br>
      
      <p style="color:red">${errorEmail}</p>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" value="${email}">
      <br><br>
      
      <p style="color:red">${errorMessage}</p>
      <label for="message">Message:</label>
      <textarea id="message" name="message">${message}</textarea>
      <br><br>

      <button type="submit">Submit</button>
    </form>
   
  `;
}