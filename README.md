# Bicycle Lease Management (MVP)

## Case 

You are working for a leasing company that needs to modernize their internal software systems. As part of this transformation, you need to build a small prototype for a **Bicycle Lease Management System** that demonstrates your fullstack development skills and understanding of business requirements.

**Your primary focus:** The logic of the Lease Contract - specifically how you link a customer to a bicycle and manage that state across the stack.

## Requirements

1. Set Up:

- Create a simple fullstack application using any technology stack you're comfortable with.
- Use the provided JSON objects to seed your application.
- Provide clear instructions on how to run your application locally.
- Include a brief README explaining your technical decisions and architecture choices.
- Use version control (Git) and make meaningful commits.
- Time limit: 2 hours (focus on core functionality rather than completeness)

2. Entities:

- Bicycle:
  - Brand
  - Model
  - Frame number (unique identifier)
  - Category (MTB / E-Bike / Gravel / City / Cargo / Folding)
  - Condition (new / used)

- Customer
  - Name
  - Email
  - Phone number
  - Address

- Lease Contract:
  - Customer (reference)
  - Bicycle (reference)
  - Start date
  - End date
  - Monthly rate
  - Status (ACTIVE / TERMINATED / COMPLETED)

3. Functionality:

- Backend:
  - Create an endpoint to fetch the provided Bicycles and Customers.
  - Create a POST endpoint to create a Lease Contract.
  - Implement a validation check for the lease duration based on the bicycle's condition:
    - If the bicycle is "new": The lease duration can be a maximum of 3 years.
    - If the bicycle is "used": The lease duration can be a maximum of 2 years.

- Frontend:
  - A view/dropdown to select a Customer and a Bicycle.
  - A form to set the lease terms (dates and monthly rate).
  - Display the Condition (new/used) of the bike during the selection process.
  - A "Submit" action that persists the contract and updates the UI.

4. Other criteria:

- Provide a README file with instructions on how to set up and run the project.
- Do not forget to follow best practices for clean code, reusability, and maintainability.
- What do you think about testing?
