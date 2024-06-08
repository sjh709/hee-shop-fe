import * as types from '../../constants/user.constants';
import { UserType } from '../../model/user';

interface StateType {
  loading: boolean;
  error: string;
  user: null | UserType;
}

interface ActionType {
  type: string;
  payload?: any;
}

const initialState: StateType = {
  loading: false,
  error: '',
  user: null,
};

function userReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, loading: false };
    case types.LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload.user };
    case types.REGISTER_USER_FAIL:
    case types.LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default userReducer;
