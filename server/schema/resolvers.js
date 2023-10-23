//WIP
const { User, Team } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
      //Team are not being populated here because it would be too cumbersome
    },
    user: async (_, { _id }) => {
      return User.findOne({ _id }).populate('team');
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('team');
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
    addPlayer: async (
      _,
      { teamId, postion, MA, ST, AG, PA, AV, skillsAndTraits, cost },
      context
    ) => {
      if (context.user) {
        return Team.findOneandUpdate(
          { _id: teamId },
          {
            $addToSet: {
              players: { postion, MA, ST, AG, PA, AV, skillsAndTraits, cost },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
  },
  removePlayer: async (_, { teamId, playerId }, context) => {
    if (context.user) {
      return Team.findOneandUpdate(
        { _id: teamId },
        {
          $pull: {
            players: {
              _id: playerId,
            },
          },
        },
        { new: true }
      );
    }
    throw AuthenticationError;
  },
};

module.exports = resolvers;
