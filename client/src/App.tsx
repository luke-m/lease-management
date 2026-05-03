import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMesssage] = useState('');

  
  return (
    <main>
      Hello world!

      <button onClick={() => {
        fetch('http://localhost:3000/')
          .then(res => res.text())
          .then(data => setMesssage(data))
      }}>
        Fetch Message
      </button>

      <p>{message}</p>
    </main>
  )
}

export default App
