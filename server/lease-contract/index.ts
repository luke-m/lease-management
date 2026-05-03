import { v4 as uuidv4 } from "uuid";
import type { LeaseContract, Customer, Bicycle } from "../types";


// domain model and business logic
export function createLeaseContract(customer: Customer, bicycle: Bicycle, startDate: string, endDate: string, monthlyRate: number) {
    const leaseDurationInYears = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 365);
    // constraints
    if (bicycle.condition === "new" && leaseDurationInYears > 3) {
        throw new Error("New bicycles cannot be leased for more than 3 years.");
    }
    if (bicycle.condition === "used" && leaseDurationInYears > 2) {
        throw new Error("Used bicycles cannot be leased for more than 1 year.");
    }

    return {
        id: uuidv4(),
        customerId: customer.id,
        bicycleId: bicycle.id,
        startDate,
        endDate,
        monthlyRate,
        status: "active"
    }
}

// "repository"

// In-memory storage for lease contracts
const leaseContracts: LeaseContract[] = [];

export function saveLeaseContract(leaseContract: LeaseContract) {
    // In a real application, you would save this to a database
    leaseContracts.push(leaseContract);
}

export function getLeaseContracts() {
    return leaseContracts;
}