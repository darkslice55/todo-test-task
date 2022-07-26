import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { closeTaskValidationResult } from '../../store/tasks/actionsCreators';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const showAddResultFlag = useSelector((state) => state.tasks.showAddResultFlag);
  const errors = useSelector((state) => state.tasks.errors);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeTaskValidationResult());
  };

  const message = React.useMemo(() => {
    return !errors.length
      ? {
          sevetity: 'success',
          text: 'Задача успешно добавлена',
        }
      : {
          sevetity: 'error',
          text: 'Произошла какая-то ошибка',
        };
  }, [errors]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={showAddResultFlag}
      autoHideDuration={5000}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={message.sevetity} sx={{ width: '100%' }}>
        {message.text}
      </Alert>
    </Snackbar>
  );
}
