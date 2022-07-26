/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const AddTodo = React.memo(() => (
  <Paper style={{ margin: 16, padding: 16 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField label="Ваше имя" variant="standard" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Ваш email" variant="standard" fullWidth />
      </Grid>
      <Grid item xs={12} sm={10}>
        <TextField label="Задача" variant="standard" fullWidth />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button fullWidth color="secondary" variant="outlined">
          Add
        </Button>
      </Grid>
    </Grid>
  </Paper>
));

export default AddTodo;
