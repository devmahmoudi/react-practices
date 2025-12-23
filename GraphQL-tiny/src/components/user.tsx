import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React, { useState } from "react";
import type { UserType } from "../types";

const GET_USER_DATA = gql`
  query getUserData($id: ID!) {
    user(id: $id) {
      name
      username
      id
    }
  }
`;

function User() {
  /**
   * User id state
   */
  const [userId, setUserId] = useState(1);

  /**
   * Send Graph query
   */
  const { data, loading }: { data: { user: UserType }; loading: boolean } =
    useQuery(GET_USER_DATA, {
      variables: {
        id: userId,
      },
    });

  /**
   * User info render
   */
  const userInfo = () => {
    if (loading || !data) return null;

    return (
      <ul>
        <li>ID: {data.user.id}</li>
        <li>Name: {data.user.name}</li>
        <li>Username: {data.user.username}</li>
      </ul>
    );
  };

  /**
   * Return on loading response
   */
  if (loading) return <h1>Single User Info is Loading ...</h1>;

  return (
    <div>
      <h3>Single User Info</h3>
      <div>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(parseInt(e.target.value))}
        />
        {userInfo()}
      </div>
    </div>
  );
}

export default User;
