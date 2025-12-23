import { gql } from "@apollo/client";

export const GET_USER_DATA = gql`
  query getUserData($id: ID!) {
    user(id: $id) {
      name
      username
      id
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query {
    users {
      data {
        username
        name
        id
      }
    }
  }
`;