import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from "../context/user";
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import LoginIcon from '@mui/icons-material/Login';

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    { name: 'Schools', link: '/schools' }, 
    { name: 'Submit a Tip', link: '/submit-a-tip' }  
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
    history.push('/profile');
  }

  const handleLogOut = () => {
    handleCloseUserMenu();
    // DELETE `/logout`
    fetch('/logout',{
      method:'DELETE'
    })
    .then(res =>{
      if(res.ok) {
        setUser(null);
        history.push('/login');
      }
    })
  }
  
  const loginMenu = (
    <IconButton href="/login">
      <LoginIcon sx={{ display: { xs: 'none', md: 'flex', color: 'white', }, mr: 1 }} />
    </IconButton>
  );

  let avatarSrc = "";
  if(user) {
    if(user.profile) {
      avatarSrc = user.profile.image;
    }
  }

  const settingsMenu = (
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={ avatarSrc } src={ avatarSrc } />
      </IconButton>
    </Tooltip>
  );

  const navigationMenu = (
    pages.map((page) => (
      <MenuItem key={page.name} onClick={handleCloseNavMenu} href={ page.link }>
        <Typography textAlign="center">{page.name}</Typography>
      </MenuItem>
    ))
  );

  const navigationButtons = (
    pages.map((page) => (
      <Button
        key={page.name}
        onClick={handleCloseNavMenu}
        sx={{ my: 2, color: 'white', display: 'block' }}
        href={ page.link }
      >
        {page.name}
      </Button>
    ))
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TipsAndUpdatesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            CIPS
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
              { user ? navigationMenu : null }
            </Menu>
          </Box>
          <TipsAndUpdatesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
            CIPS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            { user ? navigationButtons : null }
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