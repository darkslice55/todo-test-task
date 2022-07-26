/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './AddTaskForm.module.css';

const AddTodo = React.memo(({ onSubmit, resetValidation, errors = [] }) => (
  <Paper style={{ margin: 16, padding: 16 }}>
    <Grid component="form" container spacing={2} onSubmit={(event) => onSubmit(event)}>
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
      <Grid item xs={12} sm={10}>
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
      <Grid className={styles.addButtonWrapper} item xs={12} sm={2}>
        <Button type="submit" fullWidth color="secondary" variant="outlined">
          Добавить
        </Button>
      </Grid>
    </Grid>
  </Paper>
));

export default AddTodo;
