const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema({
  lat: String,
  lng: String,
  val: Number,
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
}, { timestamps: true });

const Point = mongoose.model('Point', schema);

module.exports = Point;
