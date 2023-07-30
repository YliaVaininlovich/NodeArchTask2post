const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); //парсер для обработки POST запросов


//на главную страницу
app.get('/', (req, res) => {
  res.send(generateForm());
});

//обработка формы
app.post('/submit-form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  let errorName = '', errorEmail = '', errorMessage = '';

  // Если хотя бы одно поле не заполнено, то возвращаем ошибку
  if (!name || !email || !message) { 
    if (!name) errorName = `Error: Не заполнено имя`; else errorName = "";
    if (!email) errorEmail = `Error: Не заполнен адрес электронной почты`; else errorEmail = "";
    if (!message) errorMessage = `Error: Нет комментариев`; else errorMessage = "";
    res.send(generateForm(name, email, message, errorName, errorEmail, errorMessage));

  }
  else {  
    errorName = ''; errorEmail = ''; errorMessage = '';
    res.redirect(301, `/submit-result?name=${name}&email=${email}&message=${message}`);
  }
  
});

//правильно заполненная форма
app.get('/submit-result', (req, res) => {
  res.send(`
  <p>Name: ${req.query.name}</p>
  <p>Email: ${req.query.email}</p>
  <p>Message: ${req.query.message}</p>
`);
}
);

app.listen(7280, () => {
  console.log('Server is running at 7280');
});

function generateForm(name="", email="", message="", errorName='', errorEmail='', errorMessage='') {
 
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