import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import App from '../App';

beforeEach(() => {
  cleanup();
});

describe('App', () => {
  test('renders and loads users', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
