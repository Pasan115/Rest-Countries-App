// services/countryService.js
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = () => axios.get(`${BASE_URL}/all`);

export const getCountryByName = (name) => axios.get(`${BASE_URL}/name/${name}?fullText=true`);

export const getCountryByCode = (code) => axios.get(`${BASE_URL}/alpha/${code}`);

export const getCountriesByRegion = (region) => axios.get(`${BASE_URL}/region/${region}`);

export const getCountryByCapital = (capital) => axios.get(`${BASE_URL}/capital/${capital}`);

export const getCountriesWithFields = (fields) => {
  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    return getAllCountries();
  }
  return axios.get(`${BASE_URL}/all?fields=${fields.join(',')}`);
};

export const getCountriesByTranslation = (translation) => 
  axios.get(`${BASE_URL}/translation/${translation}`);

export const getCountriesByCodes = (codes) => {
  if (!codes || codes.length === 0) return Promise.resolve({ data: [] });
  return axios.get(`${BASE_URL}/alpha?codes=${codes.join(',')}`);
};

export const getCountriesByCurrency = (currency) => 
  axios.get(`${BASE_URL}/currency/${currency}`);

// Corrected function to filter countries by language
export const getCountriesByLanguage = async (language) => {
  const response = await getAllCountries(); // Fetch all countries
  const filteredCountries = response.data.filter((country) => {
    if (country.languages) {
      return Object.values(country.languages).includes(language);
    }
    return false;
  });
  return { data: filteredCountries };
};

export const searchCountriesByName = (name) => axios.get(`${BASE_URL}/name/${name}`);

export const getCountriesForListView = () => 
  axios.get(`${BASE_URL}/all?fields=name,capital,population,region,flags,cca3,languages`);
