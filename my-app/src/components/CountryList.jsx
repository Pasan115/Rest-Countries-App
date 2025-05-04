import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';
import { CountryCard } from './CountryCard';

const CountryList = ({ countries, isLoading, error, onCountryClick, favorites = [], onToggleFavorite }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl text-center">
        <h3 className="text-red-600 dark:text-red-400 text-lg font-medium">Error loading countries</h3>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{error}</p>
      </div>
    );
  }

  if (!countries || countries.length === 0) {
    return (
      <div className="text-center p-10">
        <FaGlobe className="mx-auto text-5xl text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">No countries found</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Try changing your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {countries.map(country => (
        <CountryCard 
          key={country.cca3} 
          country={country} 
          onClick={onCountryClick}
          isFavorite={favorites.some(fav => fav.cca3 === country.cca3)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </motion.div>
  );
};

export default CountryList;