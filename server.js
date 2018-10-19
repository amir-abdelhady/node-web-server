const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to fetch the server');
  });
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My first page',
    WelcomingMessage: 'Welcome in our website!'
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
})

// app.get('/about', (req, res) => {
//   res.send({
//     name: 'Amir',
//     likes: [
//       'biking',
//       'cities'
//     ]
//   })
// })

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'My first page',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
