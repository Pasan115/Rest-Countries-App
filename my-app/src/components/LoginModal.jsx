import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaUser, FaLock } from 'react-icons/fa';
import { SessionContext } from '../context/SessionContext';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  IconButton, 
  Typography,
  InputAdornment,
  Alert
} from '@mui/material';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useContext(SessionContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    // For demo purposes, accept any non-empty username/password
    // In a real app, this would validate against a backend
    login({ name: username, avatar: `https://ui-avatars.com/api/?name=${username}&background=random` });
    onClose();
    setUsername('');
    setPassword('');
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      PaperProps={{
        component: motion.div,
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        sx: { borderRadius: 3, width: '100%', maxWidth: 480 }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'divider',
        pb: 2
      }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Sign In
        </Typography>
        <IconButton 
          onClick={onClose}
          size="small"
          sx={{ borderRadius: '50%' }}
        >
          <FaTimes />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser />
                </InputAdornment>
              ),
            }}
            placeholder="Enter your username"
          />
          
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock />
                </InputAdornment>
              ),
            }}
            placeholder="Enter your password"
          />
          
          <Typography 
            variant="body2" 
            align="center" 
            color="textSecondary"
            sx={{ mt: 2 }}
          >
            Note: This is a demo app. Any username and password will work.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          pt: 0,
          justifyContent: 'center' 
        }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ width: '100%' }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ 
                borderRadius: 2,
                textTransform: 'none', 
                py: 1
              }}
            >
              Sign In
            </Button>
          </motion.div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginModal;