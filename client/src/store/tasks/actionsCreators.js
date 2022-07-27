import { logoutAdmin } from '../auth/actionsCreators';
import {
  TASKS_ADD_FAILURE,
  TASKS_ADD_SUCCESS,
  TASKS_LOADED,
  TASKS_RESET_VALIDATION,
  TASKS_UPDATED_SUCCESS,
  TASKS_UPDATED_FAILURE,
  TASKS_CLOSE_VALIDATION_RESULT,
  TASKS_CHANGE_PAGE,
  TASKS_SHOW_EDIT,
  TASKS_CLOSE_EDIT,
} from './actionsTypes';

export function createTask(task) {
  return async (dispatch) => {
    const data = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (data.status >= 400) {
      const { errors } = await data.json();
      dispatch(addTaskFailure(errors));
    } else {
      const task = await data.json();
      dispatch(addTaskSuccess(task));
    }
  };
}

export function addTaskSuccess(task) {
  return { type: TASKS_ADD_SUCCESS, payload: task };
}

export function addTaskFailure(errors) {
  return { type: TASKS_ADD_FAILURE, payload: errors };
}

export function resetTaskValidation() {
  return { type: TASKS_RESET_VALIDATION };
}

export function closeTaskValidationResult() {
  return { type: TASKS_CLOSE_VALIDATION_RESULT };
}

export function loadTasks(query) {
  return async (dispatch) => {
    const { page, order, direction } = query;
    const data = await fetch(`/api/tasks?page=${page}&order=${order}&direction=${direction}`);
    const tasks = await data.json();
    console.log(tasks);
    dispatch(tasksLoaded(tasks));
  };
}

export function tasksLoaded(tasks) {
  return { type: TASKS_LOADED, payload: tasks };
}

export function tasksChangePage(page) {
  return { type: TASKS_CHANGE_PAGE, payload: page };
}

export function updateTask(newTask) {
  if (newTask.description && newTask.description.trim() === '') {
    delete newTask.description;
  }
  return async (dispatch) => {
    const data = await fetch(`/api/tasks/${newTask.id}`, {
      method: 'PUT',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (data.status >= 400) {
      dispatch(taskUpdatedFailure());
      dispatch(logoutAdmin());
    } else {
      dispatch(taskUpdatedSuccess(newTask));
    }
  };
}

export function taskUpdatedSuccess(newTask) {
  return { type: TASKS_UPDATED_SUCCESS, payload: newTask };
}

export function taskUpdatedFailure() {
  return { type: TASKS_UPDATED_FAILURE };
}

export function taskShowEdit(id) {
  return { type: TASKS_SHOW_EDIT, payload: id };
}

export function taskCloseEdit() {
  return { type: TASKS_CLOSE_EDIT };
}
