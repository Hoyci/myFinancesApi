const express = require('express');
const routes = require('./routes')
const app = express();


app.use(express.urlencoded({
    extended: true
  })); // Isso é para que eu consiga pegar os valores do request.body
  
app.use(express.json())
app.use(express.static('/home/ruan/projetos/myfinance/src/public'));
app.use(routes)


app.listen(3000, () => console.log('Server runinng at http://localhost:3000'))