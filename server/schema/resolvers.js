const { User, Player } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, { _id }) => {
      return User.findOne({ _id }).populate('players');
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('players');
      }
      throw AuthenticationError;
    },
    players: async () => {
      return Player.find();
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password, teamName }) => {
      const user = await User.create({ username, email, password, teamName });
      const token = signToken(user);
      return { user, token };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { user, token };
    },
    addPlayer: async (_, { position }, context) => {
      if (context.user) {
        const player = await Player.create({
          position,
          coachName: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { players: player._id } },
          { new: true }
        );

        return player;
      }
      throw AuthenticationError;
    },
    removePlayer: async (_, { playerId }, context) => {
      if (context.user) {
        const player = await Player.findOneAndDelete({
          _id: playerId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { players: player._id } },
          { new: true }
        );
        return player;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
