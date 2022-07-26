/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Container from '@mui/material/Container';
import NavBar from '../NavBar/NavBar';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import TasksList from '../TasksList/TasksList';
import CustomizedSnackbars from '../Alert/Alert';

export default function Main() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <AddTaskForm />
        <TasksList />
      </Container>
      <CustomizedSnackbars />
    </div>
  );
}
