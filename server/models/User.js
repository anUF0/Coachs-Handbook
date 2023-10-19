const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Team = './Team';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/,
      'Must match structure of an email address',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  team: [Team.schema],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  await bcrypt.compare(password, this.password);
};

module.exports = User;
