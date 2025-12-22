import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React from "react";

type User = {
  name: string;
  username: string;
  id: number;
};

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
  const { data, loading, error }: { data: { users: { data: User[] } } } =
    useQuery(GET_ALL_USERS_QUERY);

  if (loading) return <h1>LOADING ...</h1>;

  return (
    <div>
      {data.users.data.map((user) => (
        <ul>
          <li>ID: {user.id}</li>
          <li>Name: {user.name}</li>
          <li>Username: {user.username}</li>
        </ul>
      ))}
    </div>
  );
};

export default Users;
