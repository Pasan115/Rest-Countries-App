import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CountryCard } from './CountryCard';
import '@testing-library/jest-dom';

// Mock country data
const mockCountry = {
  cca3: 'USA',
  name: { common: 'United States' },
  capital: ['Washington, D.C.'],
  region: 'Americas',
  population: 331000000,
  languages: { eng: 'English' },
  flags: {
    svg: 'https://flagcdn.com/us.svg',
    png: 'https://flagcdn.com/us.png',
  }
};

describe('CountryCard component', () => {
  it('renders country info and handles clicks', () => {
    const handleClick = jest.fn();
    const toggleFavorite = jest.fn();

    render(
      <CountryCard
        country={mockCountry}
        onClick={handleClick}
        isFavorite={false}
        onToggleFavorite={toggleFavorite}
      />
    );

    // Check name
    expect(screen.getByText('United States')).toBeInTheDocument();

    // Check capital
    expect(screen.getByText(/Capital:/)).toHaveTextContent('Capital: Washington, D.C.');

    // Check region
    expect(screen.getByText(/Region:/)).toHaveTextContent('Region: Americas');

    // Check population
    expect(screen.getByText(/Population:/)).toHaveTextContent('Population: 331,000,000');

    // Check languages
    expect(screen.getByText(/Languages:/)).toHaveTextContent('Languages: English');

    // Check flag is rendered
    const flagImg = screen.getByAltText('Flag of United States');
    expect(flagImg).toBeInTheDocument();
    expect(flagImg).toHaveAttribute('src', mockCountry.flags.svg);

    // Click on star (favorite button)
    const starBtn = screen.getByLabelText(/Add to favorites/i);
    fireEvent.click(starBtn);
    expect(toggleFavorite).toHaveBeenCalledWith(mockCountry);

    // Click on "View Details" button
    const viewBtn = screen.getByRole('button', { name: 'View Details' });
    fireEvent.click(viewBtn);
    expect(handleClick).toHaveBeenCalledWith('USA');
  });
});
