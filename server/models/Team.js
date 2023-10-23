//WIP Add actual Team/Player Model
const mongoose = require('mongoose');
const Player = require('./');

const { Schema, model } = mongoose;

const teamSchema = new Schema({
  teamName: {
    type: String,
  },
  players: [Player.Schema],
  teamValue: {
    type: Number,
  },
});

const Team = model('Team', teamSchema);

module.exports = Team;
