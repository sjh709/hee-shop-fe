import { User } from '../../model/user';
import * as types from '../../constants/user.constants';
import api from '../../utils/api';
import { Dispatch } from 'redux';

interface ErrorType {
  type: string;
  error: string;
}

function registerUser({ email, name, password }: User): any {
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
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.REGISTER_USER_FAIL, payload: err.error });
    }
  };
}

export const userActions = {
  registerUser,
};
