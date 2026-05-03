import { useEffect, useState } from 'react'
import './App.css'

type Bicycle = {
  id: number;
  brand: string;
  model: string;
  category: string;
  condition: string;
  frame_number: string;
}

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

async function fetchBicycles() {
  const response = await fetch('http://localhost:3000/bicycle');
  const data = await response.json();
  return data;
}

async function fetchCustomers() {
  const response = await fetch('http://localhost:3000/customer');
  const data = await response.json();
  return data;
}

function App() {
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchBicycles().then(data => setBicycles(data));
    fetchCustomers().then(data => setCustomers(data));
  }, []);

  return (
    <main>
      <h2>Bicycles</h2>
      <ul>
        {bicycles.map(b => (
          <li key={b.id}>{b.brand} {b.model} ({b.category}) - {b.condition}</li>
        ))}
      </ul>

      <h2>Customers</h2>
      <ul>
        {customers.map(c => (
          <li key={c.id}>{c.name} ({c.email})</li>
        ))}
      </ul>
    </main>
  )
}

export default App
