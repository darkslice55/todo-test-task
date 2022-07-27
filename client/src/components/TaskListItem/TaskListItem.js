import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';

export default function TaskListItem({ task }) {
  const handleToggle = (id) => {
    console.log(id);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          {'P'}
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
        <ListItemText primary={task.description} />
      </ListItemButton>
    </ListItem>
  );
}
