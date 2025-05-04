import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchAndFilter from '../components/SearchAndFilter';

describe('SearchAndFilter Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnRegionChange = jest.fn();
  const mockOnLanguageChange = jest.fn();

  it('renders and responds to search input', () => {
    const { getByPlaceholderText } = render(
      <SearchAndFilter 
        onSearch={mockOnSearch} 
        onRegionChange={mockOnRegionChange} 
        onLanguageChange={mockOnLanguageChange} 
      />
    );

    const input = getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'Kenya' } });
    fireEvent.submit(input);

    expect(mockOnSearch).toHaveBeenCalledWith('Kenya');
  });

  it('calls onRegionChange when region is clicked', () => {
    const { getByText } = render(
      <SearchAndFilter 
        onSearch={mockOnSearch} 
        onRegionChange={mockOnRegionChange} 
        onLanguageChange={mockOnLanguageChange} 
      />
    );

    const filterButton = getByText('Filters');
    fireEvent.click(filterButton);

    const regionChip = getByText('Africa');
    fireEvent.click(regionChip);

    expect(mockOnRegionChange).toHaveBeenCalledWith('Africa');
  });

  it('calls onLanguageChange when language is clicked', () => {
    const { getByText } = render(
      <SearchAndFilter 
        onSearch={mockOnSearch} 
        onRegionChange={mockOnRegionChange} 
        onLanguageChange={mockOnLanguageChange} 
      />
    );

    const filterButton = getByText('Filters');
    fireEvent.click(filterButton);

    const languageChip = getByText('French');
    fireEvent.click(languageChip);

    expect(mockOnLanguageChange).toHaveBeenCalledWith('French');
  });
});

