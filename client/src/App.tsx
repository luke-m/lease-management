import { useEffect, useState } from 'react'
import './App.css'
import type { Bicycle, Customer, LeaseContract } from '../types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


function CustomerSelect({ selectedCustomer, setSelectedCustomer }: { selectedCustomer: Customer | null; setSelectedCustomer: (customer: Customer | null) => void }) {
  const { data: customers, isPending } = useQuery({
    queryKey: ['customers'], queryFn: async () => {
      const response = await fetch('http://localhost:3000/customer');
      const data = await response.json();
      return data;
    }
  });

  useEffect(() => {
    if (customers && customers.length > 0) {
      setSelectedCustomer(customers[0]);
    }
  }, [customers, setSelectedCustomer]);

  return (
    <div>
      <label>Customer:</label>
      {isPending ? <p>Loading customers...</p> : <select onChange={(e) => {
        const customer = customers.find(c => c.id === parseInt(e.target.value));
        setSelectedCustomer(customer || null);
      }} value={selectedCustomer ? selectedCustomer.id : ''}>
        {customers.map(customer => (
          <option key={customer.id} value={customer.id}>{customer.name}</option>
        ))}
      </select>}
    </div>
  )
}

function BicycleSelect({ selectedBicycle, setSelectedBicycle }: { selectedBicycle: Bicycle | null; setSelectedBicycle: (bicycle: Bicycle | null) => void }) {
  const { data: bicyclesData, isPending } = useQuery({
    queryKey: ['bicycles'], queryFn: async () => {
      const response = await fetch('http://localhost:3000/bicycle');
      const data = await response.json();
      return data;
    }
  });

  useEffect(() => {
    if (bicyclesData && bicyclesData.length > 0) {
      setSelectedBicycle(bicyclesData[0]);
    }
  }, [bicyclesData, setSelectedBicycle]);

  return (
    <div>
      <label>Bicycle:</label>
      {isPending ? <p>Loading bicycles...</p> : <select onChange={(e) => {
        const bicycle = bicyclesData.find(b => b.id === parseInt(e.target.value));
        setSelectedBicycle(bicycle || null);
      }} value={selectedBicycle ? selectedBicycle.id : ''}>
        {bicyclesData.map(bicycle => (
          <option key={bicycle.id} value={bicycle.id}>{bicycle.brand} {bicycle.model} ({bicycle.condition})</option>
        ))}
      </select>}
    </div>
  )
}

function LeaseContractList() {
  const { data: leaseContracts, isPending } = useQuery({
    queryKey: ['leaseContracts'], queryFn: async () => {
      const response = await fetch('http://localhost:3000/lease-contract');
      const data = await response.json();
      return data;
    }
  });

  if (isPending) {
    return <p>Loading lease contracts...</p>;
  }

  if (!leaseContracts || leaseContracts.length === 0) {
    return <p>No lease contracts found.</p>;
  }

  return (
    <div>
      <h2>Existing Lease Contracts</h2>
      <ul>
        {leaseContracts.map(contract => (
          <li key={contract.id}>
            Customer ID: {contract.customerId}, Bicycle ID: {contract.bicycleId}, Start: {contract.startDate}, End: {contract.endDate}, Monthly Rate: ${contract.monthlyRate}, Status: {contract.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [monthlyRate, setMonthlyRate] = useState<number>(0);
  const [selectedBicycle, setSelectedBicycle] = useState<Bicycle | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newLeaseContract: Omit<LeaseContract, 'id' | 'status'>) => {
      const response = await fetch('http://localhost:3000/lease-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeaseContract),
      });
      if (!response.ok) {
        throw new Error('Failed to create lease contract');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaseContracts'] });
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCustomer) {
          alert("Please select a customer.");
          return;
        }
        if (!selectedBicycle) {
          alert("Please select a bicycle.");
          return;
        }
        if (!startDate || !endDate) {
          alert("Please select start and end dates.");
          return;
        }
        if (monthlyRate <= 0) {
          alert("Please enter a valid monthly rate.");
          return;
        }
        const body = JSON.stringify({
          customer: selectedCustomer,
          bicycle: selectedBicycle,
          startDate,
          endDate,
          monthlyRate
        });
        console.log("Request body:", body);

        mutation.mutate({
          customerId: selectedCustomer.id,
          bicycleId: selectedBicycle.id,
          startDate,
          endDate,
          monthlyRate
        });
      }

  return (
    <main>
      <h1>Lease Management System</h1>
      <h2>Create Lease Contract</h2>
      <form onSubmit={handleSubmit}>
        <CustomerSelect selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />

        <BicycleSelect selectedBicycle={selectedBicycle} setSelectedBicycle={setSelectedBicycle} />

        <div>
          <label>Start Date:</label>
          <input type="date" onChange={(e) => {
            setStartDate(e.target.value)
          }} />
          <label>End Date:</label>
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <div>
          <label>Monthly Rate:</label>
          <input type="number" onChange={(e) => setMonthlyRate(parseFloat(e.target.value))} />
        </div>
        <button type="submit">Create Lease Contract</button>
      </form>
      <LeaseContractList />
    </main>
  )
}

export default App
