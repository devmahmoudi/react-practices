import { useEffect } from "react";
import { allUsersSelector } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CreateUser from "../../components/user/CreateUser";

const UserIndex = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => allUsersSelector(state));

  const handleCreateNewUser = (fullname) => {
    dispatch(createUser(fullname));
  };

  return (
    <>
      <CreateUser onSubmit={handleCreateNewUser} />
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
                {/* <button onClick={() => dispatch(destroyUser(user.id))}>
                  حذف
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserIndex;
