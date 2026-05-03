# Bicycle Lease Management (MVP)

## Running locally

Install packages
```
cd server
npm install
cd ../client
npm install
```

Start the backend

```
cd server
npm run dev
```

Start the frontend

```
cd client
npm run dev
```

Open http://localhost:5173/

## Technical and architetural decisions

I decided to put everything in one repo for simplicity. Instead of going for a monorepo approach, which I thought was overkill for this simple task, I decided to just have a client and a server folder.

For the server, I went for the simplest approach, which is an Express server. In a real project, there would be a clear divide between the different layers (application, domain, repositories) but this simple project doesn't really offer much depth to demonstrate this. A real project would obviously also have a database but implementing one would be way out of scope for this task so I used an in-memory implementation. Also missing due to time constraints are schemas to validate the payloads of the API and the "database". 

Client: I used a vite-react boilerplate to quickly set up the frontend. Initially, I went for a barebone approach where I manually fetched the data but I decided to use tanstack query instead. Especially implementing a GET after PUT without a library is cumbersome and errorprone so I think this was a good choice. If this became a large application with multiple routes, I would also consider using react-router because I like their data model but it's too complex for smaller projects like this. I decided against using a form library but this would definitely be the next step if I had more time. I'm sure there's a lot of bugs related to data validation that I would need to fix if this was a real project. I didn't put any effort into styling because I prioritized the core functionality.

Lastly, I decided against doing any testing for this task. In a real project, I would definitely follow a TDD approach but this is such a simple task that barely has any functionality that would justify the amount of effort it would take to set up a testing framework. Especially in a 2 hour timeframe, this is unrealistic. If I had more time, I would have written unit tests for the business logic related to the lease duration, integration tests for the endpoints and perhaps frontend tests for the form validation. 

All in all, I focused on core functionality rather than completeness as the requirements asked me to. In a real project with time constraints, decisions have to be made and an untested, ugly MVP is better than a tested product that doesn't do what it's supposed to (or a product that took way longer than promised).