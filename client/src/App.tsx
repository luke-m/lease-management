import { useState } from 'react'
import './App.css'

function App() {
  const [bicycles, setBicycles] = useState('');
  const [customers, setCustomers] = useState('');

  
  return (
    <main>
      Hello world!

      <button onClick={() => {
        fetch('http://localhost:3000/bicycle')
          .then(async (res) => {
            const data = await res.json();
            console.log(data);
            return data;
          })
          .then(data => setBicycles(JSON.stringify(data)))
      }}>
        Fetch Bicycles
      </button>

      <p>{bicycles}</p>

      <button onClick={() => {
        fetch('http://localhost:3000/customer')
          .then(async (res) => {
            const data = await res.json();
            console.log(data);
            return data;
          })
          .then(data => setCustomers(JSON.stringify(data)))
      }}>
        Fetch Customers
      </button>

    <p>{customers}</p>
    </main>
  )
}

export default App
