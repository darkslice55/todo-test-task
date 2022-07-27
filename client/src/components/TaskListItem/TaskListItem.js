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

export default function TaskListItem({ task }) {
  const handleToggle = (id) => {
    console.log(id);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <EditIcon />
        </IconButton>
      }
      disablePadding>
      <ListItemButton role={undefined} onClick={() => handleToggle(task.id)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            // checked={checked.indexOf(value) !== -1}
            tabIndex={-1}
            disableRipple
          />
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
