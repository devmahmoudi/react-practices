import { useState } from "react";
import type { UserType } from "../types";
import { GET_USER_DATA } from "../graphql/queries";
import { useLazyQuery } from "@apollo/client/react";

function User() {
  /**
   * User id state
   */
  const [userId, setUserId] = useState(1);

  /**
   * Send Graph query
   */
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER_DATA);

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
        <button
          onClick={() =>
            getUser({
              variables: {
                id: userId,
              },
            })
          }
        >
          Fetch
        </button>
        {userInfo()}
      </div>
    </div>
  );
}

export default User;
