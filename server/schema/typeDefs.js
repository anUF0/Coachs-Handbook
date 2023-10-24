const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    team: [Team]
  }

  type Team {
    _id: ID
    teamName: String
    players: [Player]
    teamValue: Int
  }

  type Player {
    _id: ID
    postion: String
    MA: Int!
    ST: Int!
    AG: Int!
    PA: Int!
    AV: Int!
    skillsAndTraits: [String]
    cost: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
    players: [Player]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTeam(teamName:String!): Team
    addPlayer(teamId: ID!, postion: Int!, MA: Int!, ST: Int!, AG: Int!, PA: Int!, AV: Int!, skillsAndTraits: [String], cost: Int!): Team
    removePlayer(team: ID!, playerId: ID!): Team
  }
`;

module.exports = typeDefs;
