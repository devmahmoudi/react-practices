import { useEffect, useState } from 'react';
import axios from 'axios';

function UserIndex() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsloading(true)

        const res = await axios.get('http://localhost:9000/users')

        if (res.status != 200)
          throw new Error(`Fetch user request responded status code : ${res.status}`)

        const { data } = res

        setUsers(data)

      } catch (error) {
        console.error(error.message);
      } finally {
        setIsloading(false)
      }
    }

    fetchUsers()

  }, [])

  return (
    <>
      {
        isLoading ? "Loading .." : (
          <div style={{ padding: 30 }}>
            {
              users.map((user, indes) => (
                <div key={user.id}>
                  <h3>
                    {user.name}
                  </h3>
                  <ul>
                    <li>Name {user.name}</li>
                    <li>Family {user.family}</li>
                    <li>Job {user.job}</li>
                  </ul>
                </div>
              ))
            }
          </div>
        )
      }
    </>
  );
}

export default UserIndex;
