import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { usersListSelector, usersLoaded } from './features/user/userSlice'

function App() {
  const [count, setCount] = useState(0)
  const users = useSelector(usersListSelector)
  const dispatch = useDispatch()

  const fetchUsers = () => {
    console.log('here');
    
    dispatch(usersLoaded([
    {
      name: "Mahdi",
      family: "Mahmoudi",
      phone: "09339279628"
    }
  ]))
  }

  return (
    <>
      <h2>
        Redux Thunk Practice
      </h2>
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
