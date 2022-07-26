import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_TOGGLE_LOGIN_FORM,
  AUTH_RESET_VALIDATION,
} from './actionsTypes';

const initialState = {
  isLoggedIn: false,
  isShowedForm: false,
  targetShowedForm: null,
  error: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS: {
      return { ...initialState, isLoggedIn: true };
    }

    case AUTH_LOGIN_FAILURE: {
      return { ...state, error: true };
    }

    case AUTH_LOGOUT_SUCCESS: {
      return initialState;
    }

    case AUTH_LOGOUT_FAILURE: {
      return { ...state, error: true };
    }

    case AUTH_TOGGLE_LOGIN_FORM: {
      return {
        ...state,
        isShowedForm: !state.isShowedForm,
        targetShowedForm: action.payload,
        error: false,
      };
    }
    case AUTH_RESET_VALIDATION: {
      return { ...state, error: false };
    }

    default:
      return state;
  }
}
