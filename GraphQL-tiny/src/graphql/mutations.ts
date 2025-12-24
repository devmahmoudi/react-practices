import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUserMuation(
    $name: String!
    $username: String!
    $email: String!
  ) {
    createUser(input: { name: $name, username: $username, email: $email }) {
      id
      name
      username
      email
    }
  }
`;
