const express = require('express')
const hbs= require('hbs');
require('dotenv').config();

const app = express()
const port = process.env.PORT;

app.use(express.static('public'));

app.set('view engine', 'hbs');

app.get('contact', (req, res)=> {
    res.render('home');
  });
  

app.get('contact', (req, res)=> {
  res.sendFile( __dirname + '/public/index.html')
});

app.get('/hello', (req, res)=> {
    res.send('Hello World')
  })


app.get('*', (req, res)=> {
    res.send('400 | Page not found')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })