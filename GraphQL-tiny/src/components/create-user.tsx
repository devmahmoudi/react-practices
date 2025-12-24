import { useMutation } from "@apollo/client/react";
import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../graphql/mutations";
import { UserType } from "../types";

function CreateUser() {
  /**
   * name state
   */
  const [name, setName] = useState("");

  /**
   * username state
   */
  const [username, setUsername] = useState("");

  /**
   * email state
   */
  const [email, setEmail] = useState("");

  /**
   * GraphQl mutation
   */
  const [createUser, { data, loading, called }] =
    useMutation<UserType>(CREATE_USER_MUTATION);

    console.log(data);
    

  if (loading) return <h4>Creating ...</h4>;

  if (data)
    return (
      <div>
        <h4>Created User Is:</h4>
        <div>
          <ul>
            <li>ID: {data.createUser.id}</li>
            <li>Name: {data.createUser.name}</li>
            <li>Username: {data.createUser.username}</li>
          </ul>
        </div>
      </div>
    );

  return (
    <div>
      <h4>Create New User</h4>
      <input
        type="text"
        placeholder="Name ..."
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username ..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email ..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={() => createUser({ variables: { name, email, username } })}
      >
        Create User
      </button>
    </div>
  );
}

export default CreateUser;
