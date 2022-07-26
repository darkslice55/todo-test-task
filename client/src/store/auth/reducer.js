import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_TOGGLE_LOGIN_FORM,
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
      return { ...state, isLoggedIn: true };
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
      return { ...state, isShowedForm: !state.isShowedForm, targetShowedForm: action.payload };
    }

    default:
      return state;
  }
}
