const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const playerSchema = new Schema({
  coachName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  MA: {
    type: Number,
  },
  ST: {
    type: Number,
  },
  AG: {
    type: Number,
  },
  PA: {
    type: Number,
  },
  AV: {
    type: Number,
  },
  skillsAndTraits: [{ type: String, trim: true }],
  cost: {
    type: Number,
  },
});

const Player = model('Player', playerSchema);

module.exports = Player;
