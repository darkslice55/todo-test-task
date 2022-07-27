/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks, tasksChangePage, tasksChangeSortType } from '../../store/tasks/actionsCreators';
import { FormControl, InputLabel, List, MenuItem, Pagination, Select } from '@mui/material';
import TaskListItem from '../TaskListItem/TaskListItem';
import styles from './TasksList.module.css';

export default function TasksList() {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks.tasks);
  const tasksPages = useSelector((store) => store.tasks.tasksPages);
  const sortTypeId = useSelector((store) => store.tasks.sortTypeId);
  const query = useSelector((store) => store.tasks.query);

  React.useEffect(() => {
    dispatch(loadTasks(query));
  }, [dispatch, query]);

  const handleChangePage = (e, p) => {
    dispatch(tasksChangePage(p));
  };

  const handleChangeSortType = (e) => {
    dispatch(tasksChangeSortType(e.target.value));
  };

  return (
    <>
      {!tasks.length ? (
        <p>Задач пока нет</p>
      ) : (
        <Paper className={styles.paperBlock}>
          <FormControl className={styles.sortForm} size="small">
            <InputLabel id="sort-type-select-label">Сортировка</InputLabel>
            <Select
              labelId="sort-type-select-label"
              id="sort-type-select"
              value={sortTypeId}
              onChange={handleChangeSortType}
              label="Сортировка">
              <MenuItem value={1}>По умолчанию</MenuItem>
              <MenuItem value={2}>По имени (прямой порядок)</MenuItem>
              <MenuItem value={3}>По имени (обратный порядок)</MenuItem>
              <MenuItem value={4}>По email (прямой порядок)</MenuItem>
              <MenuItem value={5}>По email (обратный порядок)</MenuItem>
              <MenuItem value={6}>По статусу (прямой порядок)</MenuItem>
              <MenuItem value={7}>По статусу (обратный порядок)</MenuItem>
            </Select>
          </FormControl>
          <List>
            {tasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </List>
          <Pagination count={tasksPages} page={query.page} onChange={handleChangePage} />
        </Paper>
      )}
    </>
  );
}
