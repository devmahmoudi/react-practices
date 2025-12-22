import { gql } from "@apollo/client";
import React from "react";

const GET_ALL_USERS_QUERY = gql`
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

const Users = () => {
  return <div>Users</div>;
};

export default Users;
