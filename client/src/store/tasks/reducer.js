import {
  TASKS_ADD_FAILURE,
  TASKS_ADD_SUCCESS,
  TASKS_LOADED,
  TASKS_RESET_VALIDATION,
  TASKS_UPDATED,
} from './actionsTypes';

const initialState = {
  tasks: [],
  clearAddFormFlag: false,
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case TASKS_ADD_SUCCESS: {
      const task = action.payload;
      return { ...state, clearAddFormFlag: true, tasks: [task, ...state.tasks] };
    }

    case TASKS_ADD_FAILURE: {
      const errors = action.payload;
      return { ...state, errors };
    }

    case TASKS_RESET_VALIDATION: {
      return { ...state, errors: undefined };
    }

    case TASKS_LOADED: {
      return { ...state, tasks: action.payload };
    }

    case TASKS_UPDATED: {
      const newTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === newTask.id ? newTask : task)),
      };
    }

    default:
      return state;
  }
}
