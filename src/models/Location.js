const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema({
  key: String,
  label: String,
}, { timestamps: true });

const Location = mongoose.model('Location', schema);

module.exports = Location;
