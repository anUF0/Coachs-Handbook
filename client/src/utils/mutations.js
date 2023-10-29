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
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PLAYER = gql`
  mutation AddPlayer(
    $position: String!
    $ma: Int!
    $st: Int!
    $ag: Int!
    $pa: Int!
    $av: Int!
    $cost: Int!
  ) {
    addPlayer(
      position: $position
      MA: $ma
      ST: $st
      AG: $ag
      PA: $pa
      AV: $av
      cost: $cost
    ) {
      _id
      coachName
      position
      MA
      ST
      AG
      PA
      AV
      skillsAndTraits
      cost
    }
  }
`;

export const DELETE_PLAYER = gql`
  mutation RemovePlayer($playerId: ID!) {
    removePlayer(playerId: $playerId) {
      _id
      position
    }
  }
`;
