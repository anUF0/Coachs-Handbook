//WIP
const { User, Team, Player } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
      //Team are not being populated here because it would be too cumbersome
    },
    user: async (_, { _id }) => {
      return User.findOne({ _id }).populate('team').populate('players');
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate('team')
          .populate('players');
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
    addTeam: async (_, { teamName }, context) => {
      if (context.user) {
        const team = await Team.create({
          teamName,
          coachName: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { team: team._id } }
        );

        return team;
      }
      throw AuthenticationError;
    },
    addPlayer: async (
      _,
      { teamName, postion, MA, ST, AG, PA, AV, skillsAndTraits, cost },
      context
    ) => {
      if (context.user) {
        const player = await Player.create({
          postion,
          MA,
          ST,
          AG,
          PA,
          AV,
          skillsAndTraits,
          cost,
        });

        await Team.findOneAndUpdate(
          { teamName: teamName },
          { $addToSet: { players: player._id } }
        );

        return player;
      }
      throw AuthenticationError;
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
  },
};

module.exports = resolvers;
