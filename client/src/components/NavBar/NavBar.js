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
import { toggleLoginForm } from '../../store/auth/actionsCreators';
import { useDispatch } from 'react-redux';
import LoginPopover from '../LoginPopover/LoginPopover';

export default function MenuAppBar() {
  const dispatch = useDispatch();

  const handleClick = (target) => {
    dispatch(toggleLoginForm(target));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ToDo list
            </Typography>
            {false ? (
              <Button color="inherit">ВЫЙТИ</Button>
            ) : (
              <div>
                <Button onClick={(event) => handleClick(event.currentTarget)} color="inherit">
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
