const mongoose = require('mongoose');

const TakeHomeRequestSchcema = mongoose.Schema({
  pet: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
  userId: Number,
  requestDate: { type: Date, default: Date.now() },
  approved: {type: Boolean, default: false},
  disapproved: {type: Boolean, default: false}
});

module.exports = mongoose.model('TakeOutRequests', TakeHomeRequestSchcema);
