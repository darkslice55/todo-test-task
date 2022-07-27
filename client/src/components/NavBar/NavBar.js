/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { getAdmin, logoutAdmin, toggleLoginForm } from '../../store/auth/actionsCreators';
import { useDispatch, useSelector } from 'react-redux';
import LoginPopover from '../LoginPopover/LoginPopover';

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  React.useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  const handleLoginClick = (target) => {
    dispatch(toggleLoginForm(target));
  };

  const handleLogoutClick = () => {
    dispatch(logoutAdmin());
  };

  console.log('isLoggedIn', isLoggedIn);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ToDo list
            </Typography>
            {isLoggedIn ? (
              <Button onClick={handleLogoutClick} color="inherit">
                ВЫЙТИ
              </Button>
            ) : (
              <div>
                <Button onClick={(event) => handleLoginClick(event.currentTarget)} color="inherit">
                  ВОЙТИ
                </Button>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <LoginPopover />
    </Box>
  );
}
