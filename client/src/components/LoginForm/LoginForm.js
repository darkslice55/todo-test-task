import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin, resetLoginValidation } from '../../store/auth/actionsCreators';

export default function LoginForm() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();
    const {
      login: { value: login },
      password: { value: password },
    } = event.target;
    console.log(login, password);
    dispatch(loginAdmin({ login, password }));
  }, []);

  const resetValidation = React.useCallback(() => {
    if (error) dispatch(resetLoginValidation());
  }, [dispatch, error]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        width: 200,
        mt: 1,
      }}>
      <TextField
        margin="normal"
        size="small"
        fullWidth
        label="Логин"
        name="login"
        autoFocus
        onChange={resetValidation}
      />
      <TextField
        margin="normal"
        size="small"
        fullWidth
        name="password"
        label="Пароль"
        type="password"
        onChange={resetValidation}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        вход
      </Button>
    </Box>
  );
}
