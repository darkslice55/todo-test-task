import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginForm } from '../../store/auth/actionsCreators';

export default function LoginPopover() {
  const dispatch = useDispatch();
  const showAuthFormFlag = useSelector((state) => state.auth.isShowedForm);
  const targetShowedForm = useSelector((state) => state.auth.targetShowedForm);

  const handleClose = () => {
    dispatch(toggleLoginForm());
  };

  const id = showAuthFormFlag ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={showAuthFormFlag}
      anchorEl={targetShowedForm}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
      <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
    </Popover>
  );
}
