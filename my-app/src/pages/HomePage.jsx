import { useState, useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Paper,
  useTheme
} from '@mui/material';
import Header from '../components/Header';
//import Hero from '../components/Hero';
import SearchAndFilter from '../components/SearchAndFilter';
import CountryList from '../components/CountryList';
import CountryDetailModal from '../components/CountryDetailModal';
import { SessionContext } from '../context/SessionContext';
import { 
  getAllCountries, 
  searchCountriesByName, 
  getCountriesByRegion, 
  getCountryByCode,
  getCountriesByLanguage
} from '../services/countryService';

const HomePage = () => {
  const theme = useTheme();
  // State for countries and filtering
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    type: null,
    value: null
  });

  // Get session context
  const { addRecentSearch, addFavorite, removeFavorite, favorites } = useContext(SessionContext);

  // Initialize AOS and fetch countries
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCountries();
      setCountries(response.data);
      setFilteredCountries(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch countries. Please try again later.');
      setIsLoading(false);
      console.error('Error fetching countries:', error);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredCountries(countries);
      setActiveFilter({ type: null, value: null });
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await searchCountriesByName(searchTerm);
      setFilteredCountries(response.data);
      setActiveFilter({ type: 'search', value: searchTerm });
      
      // Add to recent searches
      addRecentSearch({ type: 'search', value: searchTerm, timestamp: new Date().toISOString() });
      
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setFilteredCountries([]);
      } else {
        setError('Failed to search countries. Please try again later.');
      }
      setIsLoading(false);
      console.error('Error searching countries:', error);
    }
  };

  const handleRegionChange = async (region) => {
    try {
      setIsLoading(true);
      const response = await getCountriesByRegion(region);
      setFilteredCountries(response.data);
      setActiveFilter({ type: 'region', value: region });
      
      // Add to recent searches
      addRecentSearch({ type: 'region', value: region, timestamp: new Date().toISOString() });
      
      setIsLoading(false);
    } catch (error) {
      setError('Failed to filter countries by region. Please try again later.');
      setIsLoading(false);
      console.error('Error filtering by region:', error);
    }
  };

  const handleLanguageChange = async (language) => {
    try {
      setIsLoading(true);
      const response = await getCountriesByLanguage(language);
      setFilteredCountries(response.data);
      setActiveFilter({ type: 'language', value: language });
      
      // Add to recent searches
      addRecentSearch({ type: 'language', value: language, timestamp: new Date().toISOString() });
      
      setIsLoading(false);
    } catch (error) {
      setError('Failed to filter countries by language. Please try again later.');
      setIsLoading(false);
      console.error('Error filtering by language:', error);
    }
  };

  const handleCountryClick = async (countryCode) => {
    try {
      setIsLoading(true);
      const response = await getCountryByCode(countryCode);
      setSelectedCountry(response.data[0]);
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to load country details. Please try again later.');
      setIsLoading(false);
      console.error('Error loading country details:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleFavorite = (country) => {
    const isFavorite = favorites.some(fav => fav.cca3 === country.cca3);
    if (isFavorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Header />
      {/* <Hero /> */}
      
      <Container maxWidth="xl">
        {activeFilter.type && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mt: 4
          }}>
            <Typography color="text.secondary">
              {activeFilter.type === 'search' && `Search results for: "${activeFilter.value}"`}
              {activeFilter.type === 'region' && `Showing countries in: ${activeFilter.value}`}
              {activeFilter.type === 'language' && `Showing countries speaking: ${activeFilter.value}`}
            </Typography>
            <Button 
              onClick={fetchAllCountries}
              color="primary"
              sx={{ ml: 2 }}
            >
              Clear filter
            </Button>
          </Box>
        )}
        
        <SearchAndFilter 
          onSearch={handleSearch} 
          onRegionChange={handleRegionChange}
          onLanguageChange={handleLanguageChange}
        />
        
        <Box sx={{ mt: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              color: 'text.primary'
            }}
          >
            {activeFilter.type ? 'Filtered Countries' : 'All Countries'}
          </Typography>
          
          <CountryList 
            countries={filteredCountries}
            isLoading={isLoading}
            error={error}
            onCountryClick={handleCountryClick}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </Box>
      </Container>
      
      <CountryDetailModal
        country={selectedCountry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isFavorite={selectedCountry && favorites.some(fav => fav.cca3 === selectedCountry.cca3)}
        onToggleFavorite={handleToggleFavorite}
      />
      
      <Paper 
        elevation={0}
        sx={{ 
          mt: 8, 
          py: 3, 
          textAlign: 'center',
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 Countries Explorer. Powered by Rest Countries API.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HomePage;