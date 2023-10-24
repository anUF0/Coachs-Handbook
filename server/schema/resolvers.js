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
      return User.findOne({ _id }).populate('teams'); //.populate('players')//;
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate('teams')
          .populate('players');
      }
      throw AuthenticationError;
    },
    teams: async () => {
      return Team.find();
    },
    players: async () => {
      return Player.find();
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
        console.log(team);
        console.log(team._id);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { teams: team } }
        );

        console.log(team.teamName);
        return team;
      }
      throw AuthenticationError;
    },
    removeTeam: async (_, { teamId }, context) => {
      if (context.user) {
        const team = await Team.findByIdAndDelete({
          _id: teamId,
          coachName: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { teams: team._id } }
        );

        return team;
      }
      throw AuthenticationError;
    },
    addPlayer: async (
      _,
      { teamId, position, MA, ST, AG, PA, AV, skillsAndTraits, cost },
      context
    ) => {
      if (context.user) {
        const player = await Player.create({
          position,
          MA,
          ST,
          AG,
          PA,
          AV,
          skillsAndTraits,
          cost,
        });

        await Team.findOneAndUpdate(
          { _id: teamId },
          { $addToSet: { players: player } }
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
