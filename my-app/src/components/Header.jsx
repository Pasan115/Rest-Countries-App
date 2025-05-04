import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaMoon, FaSun, FaSignInAlt } from 'react-icons/fa';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Button, 
  Container
} from '@mui/material';
import { SessionContext } from '../context/SessionContext';
import { ThemeContext } from '../context/ThemeContext';
import LoginModal from './LoginModal';
import UserProfileMenu from './UserProfileMenu';

const Header = () => {
  const { isAuthenticated } = useContext(SessionContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{ position: 'sticky', top: 0, zIndex: 10 }}
      >
        <AppBar position="static" color="default" elevation={4} sx={{ py: 1 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaGlobeAmericas style={{ color: '#1976d2', fontSize: '1.5rem' }} />
                  <Typography 
                    variant="h5" 
                    component="h1" 
                    fontWeight="bold" 
                    color="text.primary"
                  >
                    Countries Explorer
                  </Typography>
                </Box>
              </motion.div>
              
              <Box sx={{ flexGrow: 1 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="text"
                    onClick={toggleTheme}
                    startIcon={isDarkMode ? <FaSun style={{ color: '#facc15' }} /> : <FaMoon />}
                    sx={{ 
                      mr: 1, 
                      px: 1.5, 
                      py: 1,
                      bgcolor: 'action.hover',
                      color: 'text.primary', 
                      borderRadius: 1,
                      textTransform: 'none'
                    }}
                  >
                    {isDarkMode ? 'Light' : 'Dark'}
                  </Button>
                </motion.div>
                
                {isAuthenticated ? (
                  <UserProfileMenu />
                ) : (
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsLoginModalOpen(true)}
                      startIcon={<FaSignInAlt />}
                      sx={{ 
                        px: 2, 
                        py: 1,
                        borderRadius: 1,
                        textTransform: 'none'
                      }}
                    >
                      Sign In
                    </Button>
                  </motion.div>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;