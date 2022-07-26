/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Container from '@mui/material/Container';
import NavBar from '../NavBar/NavBar';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

export default function Main() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <AddTaskForm />
      </Container>
    </div>
  );
}
