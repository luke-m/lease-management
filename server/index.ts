import express from 'express';
import cors from 'cors';
import { getBicycles } from './bicycle/index';
import { getCustomers } from './customer/index';
import { getLeaseContracts, saveLeaseContract } from './lease-contract';
import { createLeaseContract } from './lease-contract';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get("/bicycle", (req, res) => {
  const bicycles = getBicycles();
  res.json(bicycles);
});

app.get("/customer", (req, res) => {
  const customers = getCustomers();
  res.json(customers);
});

app.post("/lease-contract", (req, res) => {
  const requestData = req.body;
  console.log("Received lease contract data:", requestData);
  const leaseContract = createLeaseContract(
    requestData.customer,
    requestData.bicycle,
    requestData.startDate,
    requestData.endDate,
    requestData.monthlyRate
  );
  saveLeaseContract(leaseContract);
  res.json({ message: "Lease contract created successfully!" });
});

app.get("/lease-contract", (req, res) => {
  const leaseContracts = getLeaseContracts();
  res.json(leaseContracts);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});