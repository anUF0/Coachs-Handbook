//WIP Add actual Team/Player Model
const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema({
  teamName: {
    type: String,
  },
});

const Team = model('Team', teamSchema);

module.exports = Team;
