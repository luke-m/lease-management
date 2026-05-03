import express from 'express';
import cors from 'cors';
import { getBicycles } from './bicycle/index';
import { getCustomers } from './customer/index';

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

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});