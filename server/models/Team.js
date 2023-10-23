//WIP Add actual Team/Player Model
const mongoose = require('mongoose');
const Player = require('./Player');

const { Schema, model } = mongoose;

const teamSchema = new Schema({
  teamName: {
    type: String,
    required: true,
  },
  coachName: {
    type: String,
    required: true,
    trim: true,
  },
  players: [Player.schema],
  teamValue: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Team = model('Team', teamSchema);

module.exports = Team;
