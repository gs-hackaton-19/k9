const mongoose = require('mongoose');

const PetSchema = mongoose.Schema({
  name: String,
  species: {type: String},
  type: String,
  description: String,
  age: Number,
  image: {type: String, default: 'https://placekitten.com/200/300'},
  timeToDie: Date,
  cageId: Number
});

module.exports = mongoose.model('Pet', PetSchema);
