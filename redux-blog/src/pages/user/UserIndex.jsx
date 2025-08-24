import { allUsersSelector } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCreateUserMutation } from "../../api/userApi";
import CreateUser from "../../components/user/CreateUser";

const UserIndex = () => {
  const users = useSelector((state) => allUsersSelector(state));

  const [createUser, { isLoading, error, isSuccess, isError }] =
    useCreateUserMutation();

  const handleCreateNewUser = async (fullname) => {
    createUser({ fullname });
  };

  return (
    <>
      <CreateUser onSubmit={handleCreateNewUser} isLoading={isLoading} />
      {isError ?? <span style={{ color: "red" }}>{error}</span>}
      <table className="rtl-table">
        {" "}
        {/* Add class */}
        <thead>
          <tr>
            <th>آیدی</th>
            <th>نام</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <Link to={`/user-blogs/${user.id}`}>{user.fullname}</Link>
              </td>
              <td>
                {/* <button onClick={() => dispatch(destroyUser(user.id))}> */}
                حذف
                {/* </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserIndex;
