const path = require('path');
const bodyParser = require('body-parser');
const express = require('express')
const routes = require(`./routes/index`)
const root = __dirname + '/public'
const app = express();


app.disable('etag')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes)

app.use(express.static(root))


module.exports = app;

