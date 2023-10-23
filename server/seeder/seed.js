const db = require('../config/connection');
const { User, Player } = require('../models');
const userSeeds = require('./userSeeds.json');
const playerSeeds = require('./playerSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');

    await User.create(userSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  try {
    await cleanDB('Player', 'players');

    await Player.create(playerSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
