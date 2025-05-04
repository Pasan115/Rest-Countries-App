import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginModal from './LoginModal';
import { SessionContext } from '../context/SessionContext';
import '@testing-library/jest-dom/extend-expect';

// Mocked login function
const mockLogin = jest.fn();
const mockOnClose = jest.fn();

const renderComponent = (isOpen = true) => {
  return render(
    <SessionContext.Provider value={{ login: mockLogin }}>
      <LoginModal isOpen={isOpen} onClose={mockOnClose} />
    </SessionContext.Provider>
  );
};

describe('LoginModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders when isOpen is true', () => {
    renderComponent();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    renderComponent(false);
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  test('closes modal on close button click', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: '' })); // Close icon button
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('shows error if fields are empty on submit', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByText(/please enter both username and password/i)).toBeInTheDocument();
  });

  test('calls login and closes on valid form submit', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'testpass' }
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      name: 'testuser',
      avatar: expect.stringContaining('testuser')
    });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
