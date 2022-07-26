import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_TOGGLE_LOGIN_FORM,
  AUTH_RESET_VALIDATION,
} from './actionsTypes';

export function loginAdmin(admin) {
  return async (dispatch) => {
    console.log(admin);
    const data = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(admin),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (data.status >= 400) {
      dispatch(loginAdminFailure());
    } else {
      dispatch(loginAdminSuccess());
    }
  };
}

export function logoutAdmin() {
  return async (dispatch) => {
    const data = await fetch('/api/auth/logout');

    if (data.status >= 400) {
      dispatch(logoutAdminFailure());
    } else {
      dispatch(logoutAdminSuccess());
    }
  };
}

export function loginAdminSuccess() {
  return { type: AUTH_LOGIN_SUCCESS };
}

export function loginAdminFailure() {
  return { type: AUTH_LOGIN_FAILURE };
}

export function logoutAdminSuccess() {
  return { type: AUTH_LOGOUT_SUCCESS };
}

export function logoutAdminFailure() {
  return { type: AUTH_LOGOUT_FAILURE };
}

export function resetLoginValidation() {
  return { type: AUTH_RESET_VALIDATION };
}

export function toggleLoginForm(target) {
  return { type: AUTH_TOGGLE_LOGIN_FORM, payload: target };
}
