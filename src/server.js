const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pathToJson = path.resolve(__dirname, './points.json');

const app = new express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

app.get('/locations', (req, res) => {
  fs.readFile(pathToJson, 'utf8', function (err, data) {
    if (err) throw err;
    let pointsData = {};
    try {
      pointsData = JSON.parse(data);
    } catch(e) {}

    res.json(pointsData);
  });
});

app.post('/location', (req, res) => {
  fs.readFile(pathToJson, 'utf8', function (err, data) {
    if (err) throw err;
    try {
      const pointsData = JSON.parse(data);
      const spot = pointsData[req.body.spot];
      const event = spot.events[req.body.event];
      const points = event.points;
      const newPoints = [...points, Object.assign({}, req.body.location, { val: 999999999999 })];
      event.points = newPoints;
      fs.writeFile(
        pathToJson,
        JSON.stringify(pointsData),
        () => {},
      );
    } catch(e) {}
    res.end('OK', 200);
  });
});

app.listen(3000);
