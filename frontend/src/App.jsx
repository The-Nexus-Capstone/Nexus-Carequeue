import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>

      <h1>CareQueue Frontend</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Welcome to the CareQueue project frontend 🚀
        </p>
      </div>

      <p className="read-the-docs">
        DevOps CI build fix applied successfully
      </p>
    </>
  )
}

export default App

