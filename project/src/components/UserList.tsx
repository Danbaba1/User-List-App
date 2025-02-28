import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUserId?: number;
}

export const UserList: React.FC<UserListProps> = ({ users, onSelectUser, selectedUserId }) => {
  return (
    <div className="divide-y divide-gray-200">
      {users.map((user) => (
        <div
          key={user.id}
          className={`p-4 cursor-pointer hover:bg-gray-50 ${
            selectedUserId === user.id ? 'bg-blue-50' : ''
          }`}
          onClick={() => onSelectUser(user)}
          data-testid={`user-item-${user.id}`}
        >
          <h3 className="text-lg font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      ))}
    </div>
  );
};