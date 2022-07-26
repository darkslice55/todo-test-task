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

export default function MenuAppBar() {
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
                <Button color="inherit">ВОЙТИ</Button>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
