import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUsers, FaGlobeAmericas, FaLanguage, FaStar } from 'react-icons/fa';

export const CountryCard = ({ country, onClick, isFavorite, onToggleFavorite }) => {
  // Format population with commas
  const formattedPopulation = country.population?.toLocaleString();
  
  // Extract language names from the languages object
  const languages = country.languages 
    ? Object.values(country.languages).join(', ') 
    : 'N/A';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-aos="fade-up"
    >
      <Card sx={{ 
        position: 'relative', 
        borderRadius: 3,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        '&:hover': {
          boxShadow: 6,
        },
        bgcolor: 'background.paper'
      }}>
        {/* Favorite button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(country);
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            bgcolor: isFavorite ? 'warning.main' : 'rgba(255,255,255,0.7)',
            color: isFavorite ? 'white' : 'text.secondary',
            '&:hover': {
              bgcolor: isFavorite ? 'warning.dark' : 'rgba(255,255,255,0.9)',
            },
            width: 35,
            height: 35
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FaStar />
        </IconButton>
        
        <CardMedia
          component="img"
          height="160"
          image={country.flags.svg || country.flags.png}
          alt={`Flag of ${country.name.common}`}
          onClick={() => onClick(country.cca3)}
          sx={{ cursor: 'pointer' }}
        />
        
        <CardContent 
          onClick={() => onClick(country.cca3)} 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer', 
            pt: 2, 
            pb: 1 
          }}
        >
          <Typography variant="h6" component="h3" gutterBottom>
            {country.name.common}
          </Typography>
          
          <Box sx={{ mt: 2, color: 'text.secondary' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <FaMapMarkerAlt color="#1976d2" />
              <Typography variant="body2">
                <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <FaGlobeAmericas color="#1976d2" />
              <Typography variant="body2">
                <strong>Region:</strong> {country.region}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <FaUsers color="#1976d2" />
              <Typography variant="body2">
                <strong>Population:</strong> {formattedPopulation}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <FaLanguage color="#1976d2" />
              <Typography 
                variant="body2"
                noWrap
                sx={{
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <strong>Languages:</strong> {languages}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Box sx={{ p: 2, pt: 0 }}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained" 
              fullWidth
              onClick={() => onClick(country.cca3)}
              sx={{ 
                textTransform: 'none',
                borderRadius: 2
              }}
            >
              View Details
            </Button>
          </motion.div>
        </Box>
      </Card>
    </motion.div>
  );
};