/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import NavBar from '../NavBar/NavBar';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import TasksList from '../TasksList/TasksList';
import { createTask, resetTaskValidation } from '../../store/tasks/actionsCreators';

export default function Main() {
  const dispatch = useDispatch();
  const addTaskForm = React.useRef(null);
  const errors = useSelector((state) => state.tasks.errors);
  const clearAddFormFlag = useSelector((state) => state.tasks.clearAddFormFlag);

  React.useEffect(() => {
    if (clearAddFormFlag) {
      addTaskForm.current.reset();
    }
  }, [clearAddFormFlag]);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      const {
        user_name: { value: user_name },
        user_email: { value: user_email },
        description: { value: description },
      } = event.target;
      dispatch(createTask({ user_name, user_email, description }));
    },
    [dispatch],
  );

  const resetValidation = React.useCallback(() => {
    if (errors) dispatch(resetTaskValidation());
  }, [dispatch, errors]);

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <AddTaskForm
          ref={addTaskForm}
          onSubmit={handleSubmit}
          errors={errors}
          resetValidation={resetValidation}
        />
        <TasksList />
      </Container>
    </div>
  );
}
