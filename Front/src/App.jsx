import { useState } from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const increaseCount2 = ()=>{
    if(count2 >= 20) setCount2(20)
    //setCount(count + 1)
    else setCount2(count2 + 1)
  }

  const decrementCount2 = ()=>{
    if(count2 <= 0) setCount2(0)
    else if(count2 < 3) setCount2(0)
    else setCount2(count2 - 3)
  }

  return (
    <>
      <Outlet></Outlet>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
        <button onClick={() => increaseCount2()}>
        Increase
        </button>
        <button onClick={()=> decrementCount2()}>
        Decrement
        </button>
        <h3>Count is {count2}</h3>
        <p>
        Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        </div>
        <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      </>
    
  )
}

export default App
