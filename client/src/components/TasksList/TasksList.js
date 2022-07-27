/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from '../../store/tasks/actionsCreators';
import { List } from '@mui/material';
import TaskListItem from '../TaskListItem/TaskListItem';

export default function TasksList() {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks.tasks);
  React.useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  return (
    <>
      {!tasks.length ? (
        <p>Задач пока нет</p>
      ) : (
        <Paper style={{ margin: 16 }}>
          <List>
            {tasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}
