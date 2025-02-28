import { UserListResponse, User } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchUsers = async (): Promise<UserListResponse> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }
  return response.json();
};