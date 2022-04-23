const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const toDoRouter = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/todo', toDoRouter);

toDoRouter.get('/' , (req, res) => {
    console.log('GET /todo');
    let queryText = `
    SELECT * FROM "todo"
    `;
    pool.query(queryText)
    .then((dbResult) => {
        res.send(dbResult.rows);
    })
    .catch((dbError) => {
        console.log('error in GET /todo db request:', dbError);
        res.sendStatus(500);
    })
});

module.exports = toDoRouter;