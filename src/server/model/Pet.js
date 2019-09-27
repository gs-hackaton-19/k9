const mongoose = require('mongoose');

const PetSchema = mongoose.Schema({
  name: String,
  species: { type: String },
  breed: String,
  description: String,
  age: Number,
  color: String,
  sex: { type: String, enum: ['Male', 'Female'] },
  behavior: String,
  image: { type: String, default: 'https://placekitten.com/200/300' },
  timeToDie: Date,
  cageId: Number,
  coordinates: {
    type: [Number], index: '2d', sparse: true
  },
  address: String,
  qrCode: String,
});

module.exports = mongoose.model('Pet', PetSchema);
