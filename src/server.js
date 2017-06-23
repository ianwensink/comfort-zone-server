const Express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Point = require('./models/Point');
const exampleData = require('./models/example_data');

const app = new Express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/comfort-zone');

app.get('/example_data', (req, res) => {
  exampleData();
  res.end('OK', 200);
});

app.get('/locations', (req, res) => {
  Point.find({})
    .populate({
      path: 'event',
      populate: {
        path: 'locations',
      },
    })
    .exec()
    .then(points => res.json(points));
});

app.post('/location', (req, res) => {
  // fs.readFile(pathToJson, 'utf8', (err, data) => {
  //   if(err) throw err;
  //   try {
  //     const pointsData = JSON.parse(data);
  //     const spot = pointsData[req.body.spot];
  //     const event = spot.events[req.body.event];
  //     const points = event.points;
  //     const newPoints = [...points, Object.assign({}, req.body.location, { val: 999999999999 })];
  //     event.points = newPoints;
  //     fs.writeFile(
  //       pathToJson,
  //       JSON.stringify(pointsData),
  //       () => console.info('Done'),
  //     );
  //   } catch(e) {
  //     console.error('Uh oh...');
  //   }
  //   res.end('OK', 200);
  // });
});

app.listen(3000);
