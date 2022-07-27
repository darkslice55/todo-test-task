import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/tasks/actionsCreators';

export default function TaskListItem({ task }) {
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(updateTask({ id: task.id, done: !task.done }));
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <EditIcon />
        </IconButton>
      }
      disablePadding>
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox edge="start" checked={task.done} tabIndex={-1} disableRipple />
        </ListItemIcon>
        <ListItemText
          primary={task.description}
          secondary={
            <React.Fragment>
              <Typography sx={{ display: 'inline' }} component="span" variant="body2">
                {`Автор: ${task.user_name} - `}
              </Typography>
              {task.user_email}
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
