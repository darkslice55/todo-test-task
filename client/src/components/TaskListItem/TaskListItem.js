import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/tasks/actionsCreators';

export default function TaskListItem({ task }) {
  const [editFlag, setEditflag] = React.useState(false);
  const [value, setValue] = React.useState(task.description);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(updateTask({ id: task.id, done: !task.done }));
  };
  const handleClick = () => {
    if (editFlag) {
      dispatch(updateTask({ id: task.id, description: value }));
    }
    setEditflag((editFlag) => !editFlag);
  };

  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="edit task" onClick={handleClick}>
          {editFlag ? <CheckCircleOutlineIcon /> : <EditIcon />}
        </IconButton>
      }
      disablePadding>
      <ListItemButton role={undefined} onClick={!editFlag && handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            disabled={editFlag}
            checked={task.done}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        {editFlag ? (
          <TextField
            margin="normal"
            size="small"
            fullWidth
            label="Редактирование"
            name="description"
            value={value}
            onChange={handleChangeInput}
          />
        ) : (
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
        )}
      </ListItemButton>
    </ListItem>
  );
}
