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
  location: {
    type: { type: String },
    coordinates: []
  },
  address: String,
  qrCode: String,
});

PetSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Pet', PetSchema);
