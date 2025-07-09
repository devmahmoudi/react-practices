import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { counterSelector, decrement, increment, incrementByAmount } from './features/counter/counterSlice'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const count = useSelector(counterSelector)
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>
          +
        </button>
        <button style={{ marginLeft: 10, marginRight: 10 }} onClick={() => dispatch(incrementByAmount(2))}>
          count is {count}
        </button>
        <button onClick={() => dispatch(decrement())}>
          -
        </button>
        <div style={{marginTop: 10}}>
          <button style={{ marginLeft: 10, marginRight: 10 }} onClick={() => dispatch(incrementByAmount(Number(amount)))}>
            Increment Amount Value
          </button>
          <input 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{height: 30, width: 20, textAlign: 'center'}}
          />
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
