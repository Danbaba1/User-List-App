import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import sinon from 'sinon';
import axios from 'axios';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { userService } from '../services/userService.js';
import User from '../models/User.js';

describe('User Service Tests', async () => {
  let mongoServer;
  
  // Mock data
  const mockUsers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'male',
      image: 'https://example.com/john.jpg',
      age: 30,
      phone: '123-456-7890',
      birthDate: '1993-07-20'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      gender: 'female',
      image: 'https://example.com/jane.jpg',
      age: 28,
      phone: '123-456-7891',
      birthDate: '1995-03-15'
    }
  ];
  
  const mockApiResponse = {
    data: {
      users: mockUsers,
      total: 2,
      skip: 0,
      limit: 20
    }
  };
  
  const mockSingleUserResponse = {
    data: mockUsers[0]
  };

  before(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  after(async () => {
    // Clean up
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should fetch and store users from the dummy API', async () => {
    // Spy on axios.get
    const axiosGetStub = sinon.stub(axios, 'get').resolves(mockApiResponse);
    
    const users = await userService.fetchAndStoreUsers();
    
    // Verify axios.get was called with the correct URL
    assert.strictEqual(axiosGetStub.calledOnce, true);
    assert.strictEqual(axiosGetStub.firstCall.args[0], 'https://dummyjson.com/users?limit=20');
    
    // Verify users were stored in the database
    const dbUsers = await User.find().sort({ id: 1 });
    assert.strictEqual(dbUsers.length, 2);
    assert.strictEqual(dbUsers[0].firstName, 'John');
    assert.strictEqual(dbUsers[1].firstName, 'Jane');
    
    // Restore the stub
    axiosGetStub.restore();
  });

  it('should get all users from the database', async () => {
    // First, make sure we have users in the database
    await User.deleteMany({});
    await User.create(mockUsers);
    
    // Spy on fetchAndStoreUsers to ensure it's not called
    const fetchAndStoreUsersSpy = sinon.spy(userService, 'fetchAndStoreUsers');
    
    const users = await userService.getAllUsers();
    
    // Verify fetchAndStoreUsers was not called
    assert.strictEqual(fetchAndStoreUsersSpy.called, false);
    
    // Verify we got the correct users
    assert.strictEqual(users.length, 2);
    assert.strictEqual(users[0].firstName, 'John');
    assert.strictEqual(users[1].firstName, 'Jane');
    
    // Restore the spy
    fetchAndStoreUsersSpy.restore();
  });

  it('should fetch users from the API if database is empty', async () => {
    // Clear the database
    await User.deleteMany({});
    
    // Spy on fetchAndStoreUsers
    const fetchAndStoreUsersSpy = sinon.spy(userService, 'fetchAndStoreUsers');
    
    // Stub axios.get to return mock data
    const axiosGetStub = sinon.stub(axios, 'get').resolves(mockApiResponse);
    
    const users = await userService.getAllUsers();
    
    // Verify fetchAndStoreUsers was called
    assert.strictEqual(fetchAndStoreUsersSpy.calledOnce, true);
    
    // Verify we got the correct users
    assert.strictEqual(users.length, 2);
    
    // Restore stubs and spies
    fetchAndStoreUsersSpy.restore();
    axiosGetStub.restore();
  });

  it('should get a user by ID from the database', async () => {
    // First, make sure we have users in the database
    await User.deleteMany({});
    await User.create(mockUsers);
    
    // Spy on axios.get to ensure it's not called
    const axiosGetStub = sinon.stub(axios, 'get');
    
    const user = await userService.getUserById(1);
    
    // Verify axios.get was not called
    assert.strictEqual(axiosGetStub.called, false);
    
    // Verify we got the correct user
    assert.strictEqual(user.id, 1);
    assert.strictEqual(user.firstName, 'John');
    
    // Restore the stub
    axiosGetStub.restore();
  });

  it('should fetch a user from the API if not in database', async () => {
    // Clear the database
    await User.deleteMany({});
    
    // Stub axios.get to return mock data
    const axiosGetStub = sinon.stub(axios, 'get').resolves(mockSingleUserResponse);
    
    const user = await userService.getUserById(1);
    
    // Verify axios.get was called with the correct URL
    assert.strictEqual(axiosGetStub.calledOnce, true);
    assert.strictEqual(axiosGetStub.firstCall.args[0], 'https://dummyjson.com/users/1');
    
    // Verify we got the correct user
    assert.strictEqual(user.id, 1);
    assert.strictEqual(user.firstName, 'John');
    
    // Verify the user was stored in the database
    const dbUser = await User.findOne({ id: 1 });
    assert.strictEqual(dbUser.firstName, 'John');
    
    // Restore the stub
    axiosGetStub.restore();
  });
});