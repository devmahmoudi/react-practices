import { useEffect } from "react";
import { allUsersSelector } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../features/userSlice";
import { Link } from "react-router-dom";

const UserIndex = () => {
    const dispatch = useDispatch()

    const users = useSelector((state) => allUsersSelector(state))

    return (
        <table className="rtl-table">  {/* Add class */}
            <thead>
                <tr>
                    <th>آیدی</th>
                    <th>نام</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            <Link to={`/blogs?userId=${user.id}`}>{user.fullname}</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserIndex;