const express = require('express')
const path = require('path');
const app = express();

app.use(express.static(__dirname))

app.set('views', path.join(__dirname, 'static/views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.render('pages/index', {title: 'Home'});
})

app.get('/pier', function (request, response) {
    response.render('pages/pier', {title: 'Pier'});
})

app.get('/port', function (request, response) {
    response.render('pages/port', {title: 'Port'});
})

app.get('/ship', function (request, response) {
    response.render('pages/ship', {title: 'Ship'});
})

app.get('/pierShips', function (request, response) {
    response.render('pages/pierShips', {title: 'Ships on piers'});
})

app.listen(process.env.PORT || 3001)
