import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaGlobeAfrica, FaLanguage } from 'react-icons/fa';
import { 
  Box, 
  Paper, 
  InputBase, 
  Button, 
  Typography, 
  Grid, 
  Collapse, 
  InputAdornment,
  Chip
} from '@mui/material';

const SearchAndFilter = ({ onSearch, onRegionChange, onLanguageChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const languages = ['English', 'Spanish', 'French', 'Arabic', 'Chinese', 'Russian'];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Box sx={{ my: 4 }}>
      <Paper 
        elevation={3}
        sx={{ 
          p: 3, 
          borderRadius: 3,
          bgcolor: 'background.paper'
        }}
      >
        <Box component="form" onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} md>
              <InputBase
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{ 
                  pl: 2, 
                  py: 1,
                  border: 1, 
                  borderColor: 'divider', 
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                }
              />
            </Grid>
            
            <Grid item>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<FaSearch />}
                  sx={{ 
                    px: 3, 
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Search
                </Button>
              </motion.div>
            </Grid>
            
            <Grid item>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<FaFilter />}
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{ 
                    px: 3, 
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Filters
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        <Collapse in={showFilters}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <FaGlobeAfrica color="#1976d2" />
                  <Typography variant="subtitle1">
                    Filter by Region
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {regions.map(region => (
                    <motion.div key={region} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Chip
                        label={region}
                        onClick={() => onRegionChange(region)}
                        sx={{ 
                          borderRadius: 5,
                          '&:hover': {
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText'
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <FaLanguage color="#1976d2" />
                  <Typography variant="subtitle1">
                    Filter by Language
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {languages.map(language => (
                    <motion.div key={language} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Chip
                        label={language}
                        onClick={() => onLanguageChange(language)}
                        sx={{ 
                          borderRadius: 5,
                          '&:hover': {
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText'
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default SearchAndFilter;