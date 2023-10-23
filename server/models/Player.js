const mongoose = require('mongoose');

const { Schema, model } = require(mongoose);

const playerSchema = new Schema({
  //playerNumber: {
  //  type: Number,
  //},
  postion: {
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
  skillsAndTraits: {
    type: Array,
    default: [],
  },
  cost: {
    type: Number,
    required: true,
  },
});

const Player = model('Player', playerSchema);

module.exports = Player;
