import { useContext, useState, useRef } from 'react';
import { FaSignOutAlt, FaStar, FaHistory } from 'react-icons/fa';
import { SessionContext } from '../context/SessionContext';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  Paper,
  Popper,
  Typography,
  ClickAwayListener,
  Grow,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from '@mui/material';

const UserProfileMenu = () => {
  const { isAuthenticated, user, logout, favorites, recentSearches } = useContext(SessionContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setIsMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setIsMenuOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box>
      <ButtonBase
        ref={anchorRef}
        onClick={handleToggle}
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderRadius: 5,
          p: 0.5,
          pl: 1,
          '&:hover': {
            bgcolor: 'action.hover'
          },
          height: 40
        }}
      >
        <Avatar 
          src={user.avatar} 
          alt={user.name}
          sx={{ 
            width: 32, 
            height: 32, 
            border: 2, 
            borderColor: 'primary.main'
          }}
        />
        <Typography 
          sx={{ 
            display: { xs: 'none', md: 'block' },
            color: 'text.primary'
          }}
        >
          {user.name}
        </Typography>
      </ButtonBase>

      <Popper
        open={isMenuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'top right' }}
          >
            <Paper 
              elevation={6} 
              sx={{ 
                width: 280,
                mt: 1,
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        src={user.avatar} 
                        alt={user.name}
                        sx={{ 
                          width: 40, 
                          height: 40
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle1">{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">User</Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Divider />
                  
                  <List 
                    subheader={
                      <ListSubheader sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FaStar color="#f59e0b" />
                        <Typography variant="body2">
                          Favorite Countries ({favorites.length})
                        </Typography>
                      </ListSubheader>
                    }
                    dense
                    disablePadding
                    sx={{ 
                      maxHeight: 160, 
                      overflow: 'auto',
                      bgcolor: 'background.paper' 
                    }}
                  >
                    {favorites.length === 0 ? (
                      <ListItem>
                        <ListItemText 
                          primary="No favorite countries yet" 
                          primaryTypographyProps={{ 
                            variant: 'caption',
                            color: 'text.secondary'
                          }}
                        />
                      </ListItem>
                    ) : (
                      favorites.slice(0, 4).map(country => (
                        <ListItem key={country.cca3} button>
                          <Box 
                            component="img" 
                            src={country.flag} 
                            alt={country.name}
                            sx={{ width: 20, height: 12, mr: 1 }}
                          />
                          <ListItemText 
                            primary={country.name} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              noWrap: true
                            }}
                          />
                        </ListItem>
                      ))
                    )}
                    
                    {favorites.length > 4 && (
                      <ListItem button>
                        <ListItemText 
                          primary={`+ ${favorites.length - 4} more`} 
                          primaryTypographyProps={{ 
                            variant: 'caption',
                            color: 'primary.main'
                          }}
                        />
                      </ListItem>
                    )}
                  </List>
                  
                  <Divider />
                  
                  <List 
                    subheader={
                      <ListSubheader sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FaHistory color="#3b82f6" />
                        <Typography variant="body2">
                          Recent Searches
                        </Typography>
                      </ListSubheader>
                    }
                    dense
                    disablePadding
                    sx={{ 
                      maxHeight: 160, 
                      overflow: 'auto',
                      bgcolor: 'background.paper' 
                    }}
                  >
                    {recentSearches.length === 0 ? (
                      <ListItem>
                        <ListItemText 
                          primary="No recent searches" 
                          primaryTypographyProps={{ 
                            variant: 'caption',
                            color: 'text.secondary'
                          }}
                        />
                      </ListItem>
                    ) : (
                      recentSearches.slice(0, 3).map((search, index) => (
                        <ListItem key={index} button>
                          <ListItemText 
                            primary={
                              search.type === 'search' ? `Search: "${search.value}"` :
                              search.type === 'region' ? `Region: ${search.value}` :
                              `Language: ${search.value}`
                            }
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              noWrap: true
                            }}
                          />
                        </ListItem>
                      ))
                    )}
                  </List>
                  
                  <Divider />
                  
                  <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
                    <Button
                      onClick={logout}
                      color="error"
                      fullWidth
                      startIcon={<FaSignOutAlt />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        py: 1
                      }}
                    >
                      Sign Out
                    </Button>
                  </Box>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default UserProfileMenu;