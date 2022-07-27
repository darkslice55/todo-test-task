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
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskCloseEdit, taskShowEdit, updateTask } from '../../store/tasks/actionsCreators';
import styles from './TaskListItem.module.css';

export default function TaskListItem({ task }) {
  const [value, setValue] = React.useState(task.description);
  const dispatch = useDispatch();

  const showedEditTaskId = useSelector((store) => store.tasks.showedEditTaskId);
  const editFlag = task.id === showedEditTaskId;

  const handleToggle = () => {
    if (!editFlag) {
      dispatch(updateTask({ id: task.id, done: !task.done }));
    }
  };

  const handleClick = () => {
    if (editFlag) {
      dispatch(updateTask({ id: task.id, description: value }));
      dispatch(taskCloseEdit(task.id));
    } else {
      dispatch(taskShowEdit(task.id));
      setValue(task.description);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      dispatch(taskCloseEdit());
      setValue(task.description);
    }
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleClickClose = () => {
    dispatch(taskCloseEdit());
    setValue(task.description);
  };

  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton
            className={styles.iconButton}
            edge="end"
            aria-label="edit task"
            onClick={handleClick}>
            {editFlag ? <CheckCircleOutlineIcon /> : <EditIcon />}
          </IconButton>
          {editFlag && (
            <IconButton
              className={styles.iconButton}
              edge="end"
              aria-label="edit task"
              onClick={handleClickClose}>
              <CloseIcon />
            </IconButton>
          )}
        </>
      }
      disablePadding>
      <ListItemButton role={undefined} onClick={handleToggle} dense>
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
            className={styles.editInput}
            margin="normal"
            size="small"
            fullWidth
            multiline
            label="Редактирование (Esc для отмены)"
            name="description"
            value={value}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
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
