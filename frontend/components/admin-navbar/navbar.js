import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/router';
import FBInstanceAuth from "../../src/app/firebase/firebase_auth";
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import styles from './navbar.module.css';
import Image from 'next/image';
import logoImage from 'frontend/public/assets/logo.png';


const pages = ['Profile', 'Dashboard'];
const settings = ['Logout'];


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const router = useRouter();
  const [error, setError] = useState(null);
  const auth = FBInstanceAuth.getAuth();

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
    router.push('/admin-profile');
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    setError(null);

    try {
        await signOut(auth); // Use signOut directly from firebase/auth
        console.log('User signed out from Firebase');
        
        localStorage.removeItem('userToken'); // Clear the token from local storage
        console.log('userToken removed from localStorage');
        
        localStorage.removeItem('userDocID'); // Clear the userDocID from local storage
        console.log('userDocID removed from localStorage');
  
        localStorage.removeItem('userRole'); // Clear the userRole from local storage
        console.log('userToken removed from localStorage');
  
        router.push('/login');
    } catch (error) {
      setError(`Unexpected error: ${error.message}`);
      console.error('Error during logout:', error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '10px'
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="../../admin-home" style={{ textDecoration: "none" }}>
            <Image
              src={logoImage}
              alt="Logo"
              width={120}
              height={50}
            />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Box sx={{ pr: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: '#37452b',
                  fontFamily: 'TT Hoves Pro Trial, sans-serif'
                }}
              >
                {page}
              </Button>
            ))}
          </Box>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/assets/avatar.png" />
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}
                >
                  <Typography
                    sx={{
                      my: 0.1,
                      fontFamily: 'TT Hoves Pro Trial, sans-serif',
                      fontWeight: 'bold'
                    }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
