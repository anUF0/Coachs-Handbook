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
    required: true,
  },
  ST: {
    type: Number,
    required: true,
  },
  AG: {
    type: Number,
    required: true,
  },
  PA: {
    type: Number,
    required: true,
  },
  AV: {
    type: Number,
    required: true,
  },
  skillsAndTraits: [{ type: String, trim: true }],
  cost: {
    type: Number,
    required: true,
  },
});

const Player = model('Player', playerSchema);

module.exports = Player;
