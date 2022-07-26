import {
  TASKS_ADD_FAILURE,
  TASKS_ADD_SUCCESS,
  TASKS_LOADED,
  TASKS_RESET_VALIDATION,
  TASKS_UPDATED,
  TASKS_CLOSE_VALIDATION_RESULT,
} from './actionsTypes';

const initialState = {
  tasks: [],
  clearFormFlag: false,
  showAddResultFlag: false,
  errors: [],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case TASKS_ADD_SUCCESS: {
      const task = action.payload;
      return {
        ...state,
        clearFormFlag: true,
        showAddResultFlag: true,
        tasks: [task, ...state.tasks],
      };
    }

    case TASKS_ADD_FAILURE: {
      const errors = action.payload;
      return { ...state, showAddResultFlag: true, errors };
    }

    case TASKS_RESET_VALIDATION: {
      return { ...state, clearFormFlag: false, showAddResultFlag: false, errors: [] };
    }

    case TASKS_CLOSE_VALIDATION_RESULT: {
      console.log('asdasdasd');
      return { ...state, showAddResultFlag: false };
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
