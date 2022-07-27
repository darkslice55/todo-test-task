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
  TASKS_CHANGE_SORT_TYPE,
} from './actionsTypes';

const sortTypes = {
  1: { order: 'id', direction: 'DESC' },
  2: { order: 'user_name', direction: 'ASC' },
  3: { order: 'user_name', direction: 'DESC' },
  4: { order: 'user_email', direction: 'ASC' },
  5: { order: 'user_email', direction: 'DESC' },
  6: { order: 'done', direction: 'ASC' },
  7: { order: 'done', direction: 'DESC' },
};

const initialState = {
  tasks: [],
  tasksPages: 1,
  tasksCount: 0,
  limit: 3,
  clearFormFlag: false,
  showAddResultFlag: false,
  showedEditTaskId: null,
  sortTypeId: 1,
  query: { page: 1, ...sortTypes[1] },
  errors: [],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case TASKS_ADD_SUCCESS: {
      const task = action.payload;
      return {
        ...state,
        sortTypeId: 1,
        query: { page: 1, ...sortTypes[1] },
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

    case TASKS_UPDATED_SUCCESS: {
      const newTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === newTask.id ? { ...task, ...newTask } : task)),
      };
    }

    case TASKS_UPDATED_FAILURE: {
      return { ...state, showAddResultFlag: true, errors: [''] };
    }

    case TASKS_CHANGE_PAGE: {
      return {
        ...state,
        query: { ...state.query, page: action.payload },
      };
    }

    case TASKS_CHANGE_SORT_TYPE: {
      return {
        ...state,
        sortTypeId: action.payload,
        query: { ...state.query, ...sortTypes[action.payload] },
      };
    }

    case TASKS_SHOW_EDIT: {
      return {
        ...state,
        showedEditTaskId: action.payload,
      };
    }

    case TASKS_CLOSE_EDIT: {
      return {
        ...state,
        showedEditTaskId: null,
      };
    }

    default:
      return state;
  }
}
