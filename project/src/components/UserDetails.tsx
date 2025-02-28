import React from 'react';
import { User } from '../types';

interface UserDetailsProps {
  user: User;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow" data-testid="user-details">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="space-y-3">
        <div>
          <label className="font-medium text-gray-700">First Name:</label>
          <p className="mt-1">{user.firstName}</p>
        </div>
        <div>
          <label className="font-medium text-gray-700">Last Name:</label>
          <p className="mt-1">{user.lastName}</p>
        </div>
        <div>
          <label className="font-medium text-gray-700">Email:</label>
          <p className="mt-1">{user.email}</p>
        </div>
        <div>
          <label className="font-medium text-gray-700">Gender:</label>
          <p className="mt-1 capitalize">{user.gender}</p>
        </div>
      </div>
    </div>
  );
};