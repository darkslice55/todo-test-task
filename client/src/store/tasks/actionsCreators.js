import {
  TASKS_ADD_FAILURE,
  TASKS_ADD_SUCCESS,
  TASKS_LOADED,
  TASKS_RESET_VALIDATION,
  TASKS_UPDATED,
  TASKS_CLOSE_VALIDATION_RESULT,
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
