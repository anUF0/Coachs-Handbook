import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TEAM = gql`
  mutation Mutation($teamName: String!) {
    addTeam(teamName: $teamName) {
      teamName
      teamValue
      coachName
    }
  }
`;

export const ADD_PLAYER = gql`
  mutation AddPlayer(
    $teamId: ID!
    $position: String!
    $ma: Int!
    $st: Int!
    $ag: Int!
    $pa: Int!
    $av: Int!
    $cost: Int!
  ) {
    addPlayer(
      teamId: $teamId
      position: $position
      MA: $ma
      ST: $st
      AG: $ag
      PA: $pa
      AV: $av
      cost: $cost
    ) {
      _id
      position
      MA
      ST
      AG
      AV
      PA
      cost
    }
  }
`;

export const DELETE_TEAM = gql`
  mutation RemoveTeam($teamId: ID!) {
    removeTeam(teamId: $teamId) {
      _id
      teamName
    }
  }
`;

export const DELETE_PLAYER = gql`
  mutation RemovePlayer($teamId: ID!, $playerId: ID!) {
    removePlayer(teamId: $teamId, playerId: $playerId) {
      _id
      position
    }
  }
`;
