/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Container from '@mui/material/Container';
import NavBar from '../NavBar/NavBar';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import TasksList from '../TasksList/TasksList';
import AddTaskFormSnackbar from '../AddTaskFormSnackbar/AddTaskFormSnackbar';

export default function Main() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <AddTaskForm />
        <TasksList />
      </Container>
      <AddTaskFormSnackbar />
    </div>
  );
}
