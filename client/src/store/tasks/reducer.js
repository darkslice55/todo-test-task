import {
  TASKS_ADD_FAILURE,
  TASKS_ADD_SUCCESS,
  TASKS_LOADED,
  TASKS_RESET_VALIDATION,
  TASKS_UPDATED,
  TASKS_CLOSE_VALIDATION_RESULT,
  TASKS_CHANGE_PAGE,
} from './actionsTypes';

const initialState = {
  tasks: [],
  tasksPages: 1,
  tasksCount: 0,
  limit: 3,
  clearFormFlag: false,
  showAddResultFlag: false,
  query: { page: 1, order: 'createdAt', direction: 'DESC' },
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
        tasks: [task, ...state.tasks.slice(0, 2)],
        tasksCount: state.tasksCount + 1,
        tasksPages: Math.ceil((state.tasksCount + 1) / state.limit),
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
      return {
        ...state,
        tasks: action.payload.tasks,
        tasksCount: Number(action.payload.tasksCount),
        tasksPages: Math.ceil(Number(action.payload.tasksCount) / state.limit),
      };
    }

    case TASKS_UPDATED: {
      const newTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === newTask.id ? newTask : task)),
      };
    }

    case TASKS_CHANGE_PAGE: {
      return {
        ...state,
        query: { ...state.query, page: action.payload },
      };
    }

    default:
      return state;
  }
}
