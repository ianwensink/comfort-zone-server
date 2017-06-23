const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema({
  center: {
    lat: String,
    lng: String,
  },
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location',
  }],
  timestamp: {
    type: Date,
    Default: Date.now,
  }
}, { timestamps: true });

const Event = mongoose.model('Event', schema);

module.exports = Event;
