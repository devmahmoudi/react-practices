import { allUsersSelector } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
} from "../../api/userApi";
import CreateUser from "../../components/user/CreateUser";

const UserIndex = () => {
  const users = useSelector((state) => allUsersSelector(state));

  const [createUser, { isLoading, error, isSuccess, isError }] =
    useCreateUserMutation();

  const [deleteUser, { isDeleteLoading }] = useDeleteUserMutation();


  return (
    <>
      <CreateUser onSubmit={(fullname) => createUser({ fullname })} isLoading={isLoading} />
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
                <button onClick={() => deleteUser(user.id)}>
                  {isDeleteLoading ? <Spinner /> : <span>حذف</span>}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserIndex;
