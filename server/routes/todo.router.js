const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const toDoRouter = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/todo', toDoRouter);

module.exports = toDoRouter;