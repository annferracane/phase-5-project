import { useState, useContext } from 'react';
import { UserContext } from "../context/user";
import { ProfileContext } from "../context/profile";
import { useHistory } from 'react-router-dom';
import { AppBar, Avatar, Button, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography  } from '@mui/material';
import AddContractorProfile from './AddContractorProfile';
import ConstructionIcon from '@mui/icons-material/Construction';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';

function Navigation({ contractorProfile, updateContractorProfile }) {
  // State and other variables
  const { user, setUser } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);
  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  // Defines navigation menu depending on whether user is or is not logged in or is a contractor
  const loggedOutPages = [
    { name: 'All Jobs Needed', link: '/jobs-needed' }
  ];

  const loggedInPages = [ ...loggedOutPages, 
    { name: 'Submit a Job', link: '/dashboard' },  
    { name: 'My JINDAH', link: '/dashboard' }
  ];

  const contractorLoggedInPages = [ ...loggedInPages, 
    { name: 'Contractor Dashboard', link: '/contractor-dashboard' }
  ];

  let pages = [];
  if(contractorProfile) {
    pages = contractorLoggedInPages;
  } else if(user) {
    pages = loggedInPages;
  } else {
    pages = loggedOutPages;
  }

  // Handles open/close of nav menus and settings menus
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    setAnchorElNav(null);
    history.push(link);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
    history.push('/my-profile');
  }

  const handleDashboardClick = () => {
    handleCloseUserMenu();
    history.push('/dashboard');
  }

  // Handles logout
  const handleLogOut = () => {
    handleCloseUserMenu();
    fetch('/logout',{
      method:'DELETE'
    })
    .then(res =>{
      if(res.ok) {
        setUser(null);
      }
    })
    .then(history.push('/login'));
  }
  
  // Renders menu for login icon
  const loginMenu = (
    <IconButton href="/login">
      <LoginIcon sx={{ display: { xs: 'none', md: 'flex', color: 'white', }, mr: 1 }} />
    </IconButton>
  );

  // Creates an avatar
  let avatarSrc = "";
  if(user) {
    avatarSrc = <Avatar alt={ "" } src={ "" } />
    if(profile) {
      avatarSrc = <Avatar alt={ profile.full_name } src={ profile.image } />
    }
  };

  // Settings menu button
  const settingsMenu = (
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        { avatarSrc }
      </IconButton>
    </Tooltip>
  );

  // Navigation menu
  const navigationMenu = (
    pages.map((page) => (
      <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.link)}>
        <Typography textAlign="center">{page.name}</Typography>
      </MenuItem>
    ))
  );

  // Become a contractor menu item
  const becomeAContractorNavItems = (
    <AddContractorProfile updateContractorProfile={ updateContractorProfile }/>
  )

  // Navigation buttons
  const navigationButtons = (
    pages.map((page) => (
      <Button
        key={page.name}
        onClick={() => handleCloseNavMenu(page.link)}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        {page.name}
      </Button>
    ))
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ConstructionIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => history.push('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JINDAH
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              { navigationMenu }
            </Menu>
          </Box>
          <ConstructionIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JINDAH
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            { navigationButtons }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? settingsMenu : loginMenu }
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfileClick}>
                <Typography textAlign="center">My Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleDashboardClick}>
                <Typography textAlign="center">My Dashboard</Typography>
              </MenuItem>
              { contractorProfile ? null : becomeAContractorNavItems }
              <MenuItem onClick={handleLogOut}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;