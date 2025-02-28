import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import sinon from 'sinon';
import { userController } from '../controllers/userController.js';
import { userService } from '../services/userService.js';

describe('User Controller Tests', async () => {
  // Mock data
  const mockUsers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'male'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      gender: 'female'
    }
  ];

  it('should get all users', async () => {
    // Stub userService.getAllUsers
    const getAllUsersStub = sinon.stub(userService, 'getAllUsers').resolves(mockUsers);
    
    // Mock request and response
    const req = { query: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    
    await userController.getUsers(req, res);
    
    // Verify userService.getAllUsers was called with the correct limit
    assert.strictEqual(getAllUsersStub.calledOnce, true);
    assert.strictEqual(getAllUsersStub.firstCall.args[0], 20);
    
    // Verify response
    assert.strictEqual(res.status.calledWith(200), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], {
      users: mockUsers,
      total: 2,
      skip: 0,
      limit: 20
    });
    
    // Restore the stub
    getAllUsersStub.restore();
  });

  it('should get a user by ID', async () => {
    // Stub userService.getUserById
    const getUserByIdStub = sinon.stub(userService, 'getUserById').resolves(mockUsers[0]);
    
    // Mock request and response
    const req = { params: { id: '1' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    
    await userController.getUserById(req, res);
    
    // Verify userService.getUserById was called with the correct ID
    assert.strictEqual(getUserByIdStub.calledOnce, true);
    assert.strictEqual(getUserByIdStub.firstCall.args[0], '1');
    
    // Verify response
    assert.strictEqual(res.status.calledWith(200), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], mockUsers[0]);
    
    // Restore the stub
    getUserByIdStub.restore();
  });

  it('should return 404 if user not found', async () => {
    // Stub userService.getUserById to return null
    const getUserByIdStub = sinon.stub(userService, 'getUserById').resolves(null);
    
    // Mock request and response
    const req = { params: { id: '999' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    
    await userController.getUserById(req, res);
    
    // Verify userService.getUserById was called with the correct ID
    assert.strictEqual(getUserByIdStub.calledOnce, true);
    assert.strictEqual(getUserByIdStub.firstCall.args[0], '999');
    
    // Verify response
    assert.strictEqual(res.status.calledWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { message: 'User with ID 999 not found' });
    
    // Restore the stub
    getUserByIdStub.restore();
  });

  it('should handle errors in getUsers', async () => {
    // Stub userService.getAllUsers to throw an error
    const getAllUsersStub = sinon.stub(userService, 'getAllUsers').rejects(new Error('Database error'));
    
    // Mock request and response
    const req = { query: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    
    await userController.getUsers(req, res);
    
    // Verify response
    assert.strictEqual(res.status.calledWith(500), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { message: 'Failed to fetch users' });
    
    // Restore the stub
    getAllUsersStub.restore();
  });

  it('should handle errors in getUserById', async () => {
    // Stub userService.getUserById to throw an error
    const getUserByIdStub = sinon.stub(userService, 'getUserById').rejects(new Error('Database error'));
    
    // Mock request and response
    const req = { params: { id: '1' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    
    await userController.getUserById(req, res);
    
    // Verify response
    assert.strictEqual(res.status.calledWith(500), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { message: 'Failed to fetch user with ID 1' });
    
    // Restore the stub
    getUserByIdStub.restore();
  });
});