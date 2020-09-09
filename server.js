const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const app = express();
const port = 3000;
const path = require('path');
const MongoClient = require('./node_modules/mongodb').MongoClient;

app.use(bodyParser.urlencoded({
  extended: true }))
// app.use('/', express.static('public'))

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/new_visitor', (req, res) => {
  console.log(req.body);
})

app.listen(port, () => console.log(`running on ://localhost:${port}`));
