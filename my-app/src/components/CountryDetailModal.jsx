import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaUsers, FaGlobeAmericas, FaLanguage, FaMoneyBillWave, FaPhone, FaStar } from 'react-icons/fa';
import { 
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  Divider,
  Link,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for backdrop
const Backdrop = styled('div')(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1300,
  padding: theme.spacing(2)
}));

const CountryDetailModal = ({ country, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  if (!country) return null;

  // Format population with commas
  const formattedPopulation = country.population?.toLocaleString();
  
  // Extract language names from the languages object
  const languages = country.languages 
    ? Object.values(country.languages).join(', ') 
    : 'N/A';

  // Get currencies
  const currencies = country.currencies
    ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol || '-'})`)
    : ['N/A'];

  // Get borders
  const borders = country.borders || [];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ width: '100%', maxWidth: '64rem', maxHeight: '90vh', borderRadius: '12px', overflow: 'hidden' }}
          >
            <Paper 
              elevation={24}
              sx={{
                width: '100%',
                height: '100%',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 3,
                overflow: 'hidden'
              }}
            >
              {/* Modal Header */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 3,
                  borderBottom: 1,
                  borderColor: 'divider'
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  {country.name.common}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => onToggleFavorite(country)}
                    sx={{
                      bgcolor: isFavorite ? 'warning.light' : 'action.hover',
                      color: isFavorite ? 'warning.main' : 'text.secondary',
                      '&:hover': {
                        bgcolor: isFavorite ? 'warning.light' : 'action.hover',
                      }
                    }}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <FaStar />
                  </IconButton>
                  <IconButton 
                    onClick={onClose}
                    sx={{
                      '&:hover': {
                        bgcolor: 'action.hover',
                      }
                    }}
                    aria-label="Close modal"
                  >
                    <FaTimes />
                  </IconButton>
                </Box>
              </Box>

              {/* Modal Body */}
              <DialogContent 
                dividers 
                sx={{ 
                  p: 3, 
                  overflowY: 'auto',
                  flex: 1
                }}
              >
                <Grid container spacing={4}>
                  {/* Flag and Basic Info */}
                  <Grid item xs={12} md={6}>
                    <Box 
                      sx={{ 
                        mb: 3, 
                        border: 1, 
                        borderColor: 'divider',
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 2
                      }}
                    >
                      <Box
                        component="img"
                        src={country.flags.svg || country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                    </Box>

                    {country.coatOfArms?.svg && (
                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 1,
                            fontWeight: 'medium',
                            color: 'text.primary'
                          }}
                        >
                          Coat of Arms
                        </Typography>
                        <Box sx={{ width: 160, height: 160, mx: 'auto' }}>
                          <Box
                            component="img"
                            src={country.coatOfArms.svg}
                            alt={`Coat of arms of ${country.name.common}`}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Grid>

                  {/* Country Details */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 1,
                          fontWeight: 'medium',
                          color: 'text.primary'
                        }}
                      >
                        Official Name
                      </Typography>
                      <Typography color="text.secondary">{country.name.official}</Typography>
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 1,
                            fontWeight: 'medium',
                            color: 'text.primary'
                          }}
                        >
                          Capital
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FaMapMarkerAlt color="#1976d2" />
                          <Typography color="text.secondary">
                            {country.capital?.[0] || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 1,
                            fontWeight: 'medium',
                            color: 'text.primary'
                          }}
                        >
                          Region
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FaGlobeAmericas color="#1976d2" />
                          <Typography color="text.secondary">
                            {country.region} ({country.subregion || 'N/A'})
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ mb: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 1,
                          fontWeight: 'medium',
                          color: 'text.primary'
                        }}
                      >
                        Population
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FaUsers color="#1976d2" />
                        <Typography color="text.secondary">{formattedPopulation}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 1,
                          fontWeight: 'medium',
                          color: 'text.primary'
                        }}
                      >
                        Languages
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FaLanguage color="#1976d2" />
                        <Typography color="text.secondary">{languages}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 1,
                          fontWeight: 'medium',
                          color: 'text.primary'
                        }}
                      >
                        Currencies
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FaMoneyBillWave color="#1976d2" />
                        <Typography color="text.secondary">{currencies.join(', ')}</Typography>
                      </Box>
                    </Box>

                    {country.idd?.root && (
                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 1,
                            fontWeight: 'medium',
                            color: 'text.primary'
                          }}
                        >
                          Calling Code
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FaPhone color="#1976d2" />
                          <Typography color="text.secondary">
                            {country.idd.root}{country.idd.suffixes?.[0] || ''}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Grid>
                </Grid>

                {/* Neighboring Countries */}
                {borders.length > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2,
                        fontWeight: 'medium',
                        color: 'text.primary'
                      }}
                    >
                      Bordering Countries
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {borders.map(border => (
                        <Chip
                          key={border}
                          label={border}
                          sx={{ 
                            borderRadius: 3,
                            bgcolor: 'action.hover',
                            color: 'text.primary'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {country.maps?.googleMaps && (
                  <Box sx={{ mt: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 1,
                        fontWeight: 'medium',
                        color: 'text.primary'
                      }}
                    >
                      Location
                    </Typography>
                    <Link
                      href={country.maps.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'primary.main',
                        '&:hover': {
                          color: 'primary.dark'
                        }
                      }}
                    >
                      <FaMapMarkerAlt /> View on Google Maps
                    </Link>
                  </Box>
                )}
              </DialogContent>

              {/* Modal Footer */}
              <Box 
                sx={{ 
                  px: 3, 
                  py: 2,
                  bgcolor: 'background.default',
                  borderTop: 1,
                  borderColor: 'divider'
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onClose}
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2
                  }}
                >
                  Close
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default CountryDetailModal;