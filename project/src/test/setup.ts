// src/test/setup.ts
import { afterAll, afterEach, beforeAll } from 'vitest';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'male',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    gender: 'female',
  },
];

const handlers = [
  http.get('http://localhost:5000/api/users', () => {
    return HttpResponse.json({
      users,
      total: 2,
      skip: 0,
      limit: 20,
    });
  }),
    
  http.get('http://localhost:5000/api/users/1', () => {
    return HttpResponse.json(users[0]);
  }),
    
  http.get('http://localhost:5000/api/users/2', () => {
    return HttpResponse.json(users[1]);
  })
];

// Setup server with explicit options to avoid WebSocket usage
export const server = setupServer(...handlers);

// Make sure server doesn't try to use WebSockets
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
