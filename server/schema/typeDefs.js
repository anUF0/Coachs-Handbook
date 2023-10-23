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
    players: Array
    teamValue: Number
  }

  type Player {
  
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlayer(teamId: ID!, postion: Num!, MA: Num!, ST: Num!, AG: Num!, PA: Num!, AV: Num!, skillsAndTraits: Array, cost: Num!): Team
    removePlayer(team: ID!, playerId: ID!)
  }
`;

module.exports = typeDefs;
