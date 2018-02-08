const Express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Point = require('./models/Point');
const Event = require('./models/Event');
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

app.get('/heatmap', (req, res) => {
  const promises = [
    Point.find({})
      .exec(),
    Event.find({})
      // .populate('locations')
      .exec(),
  ];

  const names = ['points', 'events'];

  Promise.all(promises)
    .then((response) => {
      const data = {};
      for(let i = 0; i < response.length; i++) {
        data[names[i]] = response[i];
      }
      res.json(data);
    })
    .catch((e) => res.end('ERROR', 400));
});

app.get('/events/:eventId', (req, res) => {
  Event.findOne({ _id: req.params.eventId })
    .exec()
    .then(event => res.json(event))
    .catch((e) => res.end('ERROR', 400));
});

app.get('/events', (req, res) => {
  Event.find({})
    .sort({ label: 1 })
    .populate('locations')
    .exec()
    .then(events => res.json(events))
    .catch((e) => res.end('ERROR', 500));
});

app.get('/locations', (req, res) => {
  Location.find({})
    .sort({ label: 1 })
    .exec()
    .then(locations => res.json(locations))
    .catch((e) => res.end('ERROR', 500));
});

app.post('/point', (req, res) => {
  res.end('ERROR', 400);
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

app.listen(3000, () => {
  console.log(`✅  server started on port: 3000`); // eslint-disable-line
});
