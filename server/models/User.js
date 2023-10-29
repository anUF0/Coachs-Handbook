const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  teamName: {
    type: String,
    required: true,
    maxLength: 50,
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
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
