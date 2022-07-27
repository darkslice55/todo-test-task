/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks, tasksChangePage } from '../../store/tasks/actionsCreators';
import { List, Pagination } from '@mui/material';
import TaskListItem from '../TaskListItem/TaskListItem';

export default function TasksList() {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks.tasks);
  const tasksPages = useSelector((store) => store.tasks.tasksPages);
  const query = useSelector((store) => store.tasks.query);

  React.useEffect(() => {
    dispatch(loadTasks(query));
  }, [dispatch, query]);

  const handleChange = (e, p) => {
    dispatch(tasksChangePage(p));
  };

  return (
    <>
      {!tasks.length ? (
        <p>Задач пока нет</p>
      ) : (
        <Paper style={{ margin: 16, paddingBottom: 15 }}>
          <List>
            {tasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </List>
          <Pagination count={tasksPages} onChange={handleChange} />
        </Paper>
      )}
    </>
  );
}
