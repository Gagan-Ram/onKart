import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = (props) => {
  return (
    <InputBase className={props.classes}
      sx={{
        ml: 1,
        flex: 1,
        width: props.classes === "desktop" ? 700 : "98%",
        // bgcolor: "black",
        // color: "white",
        border: 2,
        borderRadius: 5,
        paddingLeft: 2,
        paddingRight: 2,
      }}
      placeholder="Search for Items"
      value={props.video}
      onChange={props.search}
      endAdornment={<SearchIcon />}
    />
  )
}


export default function ButtonAppBar({ displayCartItems, setDisplayCartItems, setOpen, searchItem, setSearchItem, showCartAndSearch }) {

  // const greenLikeColor = "#00796b"
  const [showCart, setShowCart] = useState(false)
  const isSmallScreen = useMediaQuery("(max-width: 1119px)");
  const navigate = useNavigate()

  const settings = ['Logout'];
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const performLogout = () => {
    localStorage.clear()
    navigate('/login')
  };

  const searchInputHandler = (event) => {
    // setIsLoading(true)
    setSearchItem(event.target.value)
  }

  const showCartItems = () => {
    setShowCart(!showCart)
    setDisplayCartItems(!displayCartItems)
    setOpen(true)
  }

  return (
    <Box  >
      <AppBar position="static" sx={{ bgcolor: "white" }} >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "green" }}>
              OnKart
            </Typography>
          </Box>

          <Box>
            {
              (!isSmallScreen && showCartAndSearch) && (
                <SearchBar video={searchItem} search={searchInputHandler} classes="desktop" />
              )
            }
          </Box>

          {
            localStorage.getItem('onKart') ? (

              <Box>
                <Box sx={{ flexGrow: 0 }}>
                  {
                    showCartAndSearch && (
                      <Button color="success" sx={{ right: 25 }} startIcon={<ShoppingCartCheckoutIcon />}
                        onClick={showCartItems}
                      >
                      </Button>
                    )
                  }
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                      <AccountCircleIcon fontSize='large' color='success' />
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
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={performLogout} >{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            ) :

              <Box>
                <Link to={'login'}>
                  <Button color="success" sx={{ right: 25 }} >Login</Button>
                </Link>
                <Link to={'register'}>
                  <Button color="success" variant="contained">Register</Button>
                </Link>
              </Box>
          }
        </Toolbar>

        <Box >
          {
              (isSmallScreen && showCartAndSearch) && (
              <SearchBar title={searchItem} search={searchInputHandler} classes="mobile" />
            )
          }
        </Box>
      </AppBar>
    </Box>
  );
}
