/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './AddTaskForm.module.css';
import { createTask, resetTaskValidation } from '../../store/tasks/actionsCreators';

export default function AddTodo() {
  const dispatch = useDispatch();
  const addTaskForm = React.useRef(null);
  const errors = useSelector((state) => state.tasks.errors);
  const clearFormFlag = useSelector((state) => state.tasks.clearFormFlag);

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

  React.useEffect(() => {
    if (clearFormFlag) {
      addTaskForm.current.reset();
    }
  }, [clearFormFlag]);

  const resetValidation = React.useCallback(() => {
    if (errors) dispatch(resetTaskValidation());
  }, [dispatch, errors]);

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid
        ref={addTaskForm}
        component="form"
        container
        spacing={2}
        onSubmit={(event) => handleSubmit(event)}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={errors.includes('user_name')}
            helperText={errors.includes('user_name') && 'имя не может быть пустым'}
            onChange={resetValidation}
            name="user_name"
            label="Ваше имя"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={errors.includes('user_email')}
            helperText={errors.includes('user_email') && 'неправильный формат email'}
            onChange={resetValidation}
            name="user_email"
            label="Ваш email"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            error={errors.includes('description')}
            helperText={errors.includes('description') && 'задача не может быть пустой'}
            onChange={resetValidation}
            name="description"
            label="Задача"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid className={styles.addButtonWrapper} item xs={12} sm={3}>
          <Button type="submit" fullWidth color="secondary" variant="outlined">
            Добавить
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
