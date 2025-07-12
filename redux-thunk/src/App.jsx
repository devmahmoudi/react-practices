import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { usersListSelector, usersLoaded } from './features/user/userSlice'
import { fetchUsers as fetchUserList } from './features/user/userSlice'

function App() {
  const [count, setCount] = useState(0)
  const users = useSelector(usersListSelector)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const fetchUsers = () => {
    // Dispatch Redux Thunk 
    dispatch(fetchUserList())  

    setLoading(true)
  }

  useEffect(() => {
    if(users.length)
      setLoading(false)
  }, [users])

  return (
    <>
      <h2>
        Redux Thunk Practice
      </h2>
      {
        loading && (
          <h6>Loading ...</h6>
        )
      }
      <div>
        {
          (users.map((user, index) =>
          (
            <>
              <p>
                <span>Name:</span>
                <span>{user.name}</span>
              </p>
              <p>
                <span>Family:</span>
                <span>{user.family}</span>
              </p>
              <p>
                <span>Phone:</span>
                <span>{user.phone}</span>
              </p>
            </>
          )))
        }
      </div>
      <div>
        <button onClick={fetchUsers}>Fetch Users</button>
      </div>
    </>
  )
}

export default App
