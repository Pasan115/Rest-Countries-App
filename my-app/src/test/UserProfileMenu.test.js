import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserProfileMenu from '../components/UserProfileMenu';
import { SessionContext } from '../context/SessionContext';
import '@testing-library/jest-dom';

// Mock user data
const mockUser = {
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
};

const mockFavorites = [
  { name: 'France', flag: 'https://flagcdn.com/fr.svg', cca3: 'FRA' },
  { name: 'Germany', flag: 'https://flagcdn.com/de.svg', cca3: 'DEU' },
  { name: 'Japan', flag: 'https://flagcdn.com/jp.svg', cca3: 'JPN' },
  { name: 'Canada', flag: 'https://flagcdn.com/ca.svg', cca3: 'CAN' },
  { name: 'Brazil', flag: 'https://flagcdn.com/br.svg', cca3: 'BRA' }, // extra for "+ more"
];

const mockRecentSearches = [
  { type: 'search', value: 'Ethiopia' },
  { type: 'region', value: 'Africa' },
  { type: 'language', value: 'French' },
];

const mockLogout = jest.fn();

const renderWithContext = (contextValue) => {
  render(
    <SessionContext.Provider value={contextValue}>
      <UserProfileMenu />
    </SessionContext.Provider>
  );
};

describe('UserProfileMenu', () => {
  test('renders null if not authenticated', () => {
    renderWithContext({ isAuthenticated: false });
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
  });

  test('displays user name and avatar', () => {
    renderWithContext({
      isAuthenticated: true,
      user: mockUser,
      logout: mockLogout,
      favorites: [],
      recentSearches: [],
    });

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockUser.avatar);
  });

  test('shows popper menu when avatar button is clicked', async () => {
    renderWithContext({
      isAuthenticated: true,
      user: mockUser,
      logout: mockLogout,
      favorites: mockFavorites,
      recentSearches: mockRecentSearches,
    });

    fireEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(screen.getByText('Favorite Countries (5)')).toBeInTheDocument();
      expect(screen.getByText('Recent Searches')).toBeInTheDocument();
    });

    // Check at least one favorite country
    expect(screen.getByText('France')).toBeInTheDocument();

    // Check "+ more"
    expect(screen.getByText('+ 1 more')).toBeInTheDocument();

    // Check recent search rendering
    expect(screen.getByText('Search: "Ethiopia"')).toBeInTheDocument();
    expect(screen.getByText('Region: Africa')).toBeInTheDocument();
    expect(screen.getByText('Language: French')).toBeInTheDocument();
  });

  test('calls logout on Sign Out button click', async () => {
    renderWithContext({
      isAuthenticated: true,
      user: mockUser,
      logout: mockLogout,
      favorites: [],
      recentSearches: [],
    });

    fireEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Sign Out'));
      expect(mockLogout).toHaveBeenCalled();
    });
  });
});
