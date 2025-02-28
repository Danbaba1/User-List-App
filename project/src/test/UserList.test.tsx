import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { UserList } from '../components/UserList';

const mockUsers = [
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

beforeEach(() => {
  cleanup();
});


describe('UserList', () => {
  test('renders all users', () => {
    render(<UserList users={mockUsers} onSelectUser={() => {}} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
  });

  test('calls onSelectUser when a user is clicked', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();
    
    render(<UserList users={mockUsers} onSelectUser={handleSelect} />);
    
    // Use getByTestId instead of queryByTestId as we know it exists
    const userItem = screen.getByTestId('user-item-1');
    await user.click(userItem);
    expect(handleSelect).toHaveBeenCalledWith(mockUsers[0]);
  });

  test('highlights selected user', () => {
    render(
      <UserList 
        users={mockUsers} 
        onSelectUser={() => {}} 
        selectedUserId={1}
      />
    );
    
    // Use getAllByTestId to handle potential multiple elements 
    const selectedItem = screen.getByTestId('user-item-1');
    expect(selectedItem).toHaveClass('bg-blue-50');
  });
});
