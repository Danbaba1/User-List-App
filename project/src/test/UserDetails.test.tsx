import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { UserDetails } from '../components/UserDetails';

describe('UserDetails', () => {
  const mockUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'male',
  };

  test('renders user details correctly', () => {
    render(<UserDetails user={mockUser} />);
    
    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });
});
