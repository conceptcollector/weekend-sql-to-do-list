const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const toDoRouter = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/todo', toDoRouter);

toDoRouter.get('/', (req, res) => {
    console.log('GET /todo');
    let queryText = `
    SELECT * FROM "todo"
    `;
    pool.query(queryText)
    .then((dbResult) => {
        res.send(dbResult.rows);
    })
    .catch((dbError) => {
        console.log('GET /todo db request isn\'t working', dbError);
        res.sendStatus(500);
    })
});

toDoRouter.post('/', (req, res) => {
    console.log('in /todo POST:', req.body);
    const query = `
        INSERT INTO "todo" ("name")
            VALUES ($1,);
    `;
    const value = [req.body.name];
    pool.query(query, value)
    .then((results) => {
        res.sendStatus(201);
    }).catch( (dbError) => {
        console.log('POST /todo route isn\'t working', dbError);
        res.sendStatus(500);
    })
})

toDoRouter.put('/:taskID', (req, res) => {
    let sqlQuery = `
    UPDATE "todo"
      SET "pendingStatus"=$1
      WHERE "id"=$2;
    `;
    let sqlValues = [
      req.body.pendingStatus,
      req.params.taskID
    ]
    pool.query(sqlQuery, sqlValues)
      .then((results) => {
        res.sendStatus(200);
      })
      .catch((dbError) => {
        console.log('PUT /todo route isn\'t working', dbError);
        res.sendStatus(500);
      })
  })

module.exports = toDoRouter;