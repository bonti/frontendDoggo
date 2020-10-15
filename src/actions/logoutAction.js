import * as types from './actionTypes';

export function logoutSuccess(state) {
  return { type: types.LOGOUT, state }
}

export function logout() {
    return async (dispatch) => {
      dispatch(logoutSuccess(undefined));
    }
}
