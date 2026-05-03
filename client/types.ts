// ideally, this would be a shared resource for both client and server, but for simplicity we'll just duplicate it here

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type Bicycle = {
  id: number;
  brand: string;
  model: string;
  category: string;
  condition: string; // 'new' | 'used'
  frame_number: string;
}

export type LeaseContract = {
    id: string; // this could be omitted because customerId + bicycleId (+ startDate?) should be unique, but we'll include it for simplicity
    customerId: number;
    bicycleId: number;
    startDate: string;
    endDate: string;
    monthlyRate: number;
    status: string; // 'active' | 'terminated' | 'completed'
}