import {
  TASKS_ADD_FAILURE,
  TASKS_ADD_SUCCESS,
  TASKS_LOADED,
  TASKS_RESET_VALIDATION,
  TASKS_UPDATED,
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

export function addTaskFailure(message) {
  return { type: TASKS_ADD_FAILURE, payload: message };
}

export function resetTaskValidation() {
  return { type: TASKS_RESET_VALIDATION };
}
