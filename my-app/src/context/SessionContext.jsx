import { createContext, useState, useEffect } from 'react';

// Create the context
export const SessionContext = createContext({
  isAuthenticated: false,
  user: null,
  favorites: [],
  recentSearches: [],
  login: () => {},
  logout: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  addRecentSearch: () => {},
  clearRecentSearches: () => {},
});

export const SessionProvider = ({ children }) => {
  // Initialize state from localStorage or with defaults
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('isAuthenticated');
    return saved ? JSON.parse(saved) : false;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [isAuthenticated, user, favorites, recentSearches]);

  // Login function - in a real app, you'd validate credentials against a backend
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Add a country to favorites
  const addFavorite = (country) => {
    // Check if country already exists in favorites
    if (!favorites.some(fav => fav.cca3 === country.cca3)) {
      setFavorites([...favorites, {
        cca3: country.cca3,
        name: country.name.common,
        flag: country.flags.svg || country.flags.png,
        region: country.region,
        addedAt: new Date().toISOString()
      }]);
    }
  };

  // Remove a country from favorites
  const removeFavorite = (countryCode) => {
    setFavorites(favorites.filter(country => country.cca3 !== countryCode));
  };

  // Add a search term to recent searches
  const addRecentSearch = (searchData) => {
    // Only keep the last 10 searches
    const updatedSearches = [
      searchData,
      ...recentSearches.filter(search => 
        search.type !== searchData.type || search.value !== searchData.value
      )
    ].slice(0, 10);
    
    setRecentSearches(updatedSearches);
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  // Create the context value object
  const contextValue = {
    isAuthenticated,
    user,
    favorites,
    recentSearches,
    login,
    logout,
    addFavorite,
    removeFavorite,
    addRecentSearch,
    clearRecentSearches,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};