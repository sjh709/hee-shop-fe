import { RegisterUserType } from '../../model/user';
import * as types from '../../constants/user.constants';
import api from '../../utils/api';
import { Dispatch } from 'redux';
import { commonUIActions } from './commonUIAction';
import { NavigateFunction } from 'react-router-dom';

interface ErrorType {
  type: string;
  error: string;
}

function registerUser(
  { email, name, password }: RegisterUserType,
  navigate: NavigateFunction
): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const response = await api.post('/user', {
        email,
        name,
        password,
      });
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({ type: types.REGISTER_USER_SUCCESS });
      dispatch(
        commonUIActions.showToastMessage('회원가입을 완료 했습니다!', 'success')
      );
      navigate('/login');
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.REGISTER_USER_FAIL, payload: err.error });
    }
  };
}

function loginWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.LOGIN_REQUEST });
      const response = await api.post('/auth/login', { email, password });
      if (response.status !== 200) throw new Error(response.data.error);
      sessionStorage.setItem('token', response.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.LOGIN_FAIL, payload: err.error });
    }
  };
}

function loginWithToken(): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
      const response = await api.get('/user/me');
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({
        type: types.LOGIN_WITH_TOKEN_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL, payload: err.error });
      dispatch(logout());
    }
  };
}

function logout(): any {
  return async (dispatch: Dispatch) => {
    dispatch({ type: types.LOGOUT });
    sessionStorage.removeItem('token');
  };
}

function loginWithGoogle(token: string): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
      const response = await api.post('/auth/google', { token });
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: err.error });
      dispatch(commonUIActions.showToastMessage(err.error, 'error'));
    }
  };
}

export const userActions = {
  registerUser,
  loginWithEmail,
  loginWithToken,
  logout,
  loginWithGoogle,
};
