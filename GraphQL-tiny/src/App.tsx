import "./App.css";
import CreateUser from "./components/create-user";
import User from "./components/user";
import Users from "./components/users";

function App() {
  return (
    <>
      <CreateUser />
      <hr />
      <User />
      <hr />
      <Users />
    </>
  );
}

export default App;
