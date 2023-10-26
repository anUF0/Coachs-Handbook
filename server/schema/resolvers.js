//WIP
const { User, Team, Player } = require('../models');
const { populate } = require('../models/Player');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('teams');
      //Team are not being populated here because it would be too cumbersome
    },
    user: async (_, { _id }) => {
      return User.findOne({ _id })
        .populate('teams')
        .populate({ path: 'teams', populate: 'players' });
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate('teams')
          .populate({ path: 'teams', populate: 'players' });
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
      console.log(context.user);

      if (context.user) {
        const team = await Team.create({
          teamName,
          coachName: context.user.username,
        });

        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { teams: team._id } },
          { new: true }
        );

        console.log(team.teamName);
        return team;
      }
      throw AuthenticationError;
    },
    removeTeam: async (_, { teamId }, context) => {
      if (context.user) {
        const team = await Team.findOneAndDelete({
          _id: teamId,
          coachName: context.user.username,
        });

        console.log(context.user);
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { teams: team._id } },
          { new: true }
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
        console.log(teamId);
        console.log(playerId);

        const player = await Player.findOneAndDelete({
          _id: playerId,
        });

        await Team.findOneAndUpdate(
          { _id: teamId },
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
