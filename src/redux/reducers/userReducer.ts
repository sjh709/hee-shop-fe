import * as types from '../../constants/user.constants';

interface StateType {
  loading: boolean;
  error: string;
}

interface ActionType {
  type: string;
  payload?: any;
}

const initialState: StateType = {
  loading: false,
  error: '',
};

function userReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, loading: false };
    case types.REGISTER_USER_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default userReducer;
