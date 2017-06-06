const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const pathToJson = path.resolve(__dirname, './points.json');

const app = new Express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get('/locations', (req, res) => {
  fs.readFile(pathToJson, 'utf8', (err, data) => {
    if(err) throw err;
    let pointsData = {};
    try {
      pointsData = JSON.parse(data);
    } catch(e) {
      console.error('Uh oh...');
    }

    res.json(pointsData);
  });
});

app.post('/location', (req, res) => {
  fs.readFile(pathToJson, 'utf8', (err, data) => {
    if(err) throw err;
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
        () => console.info('Done'),
      );
    } catch(e) {
      console.error('Uh oh...');
    }
    res.end('OK', 200);
  });
});

app.listen(3000);
