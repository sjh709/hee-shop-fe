import { ToastMessageType } from '../../model/commonUI';
import * as types from '../../constants/commonUI.constants';

interface StateType {
  toastMessage: ToastMessageType;
}

interface ActionType {
  type: string;
  payload?: any;
}

const initialState = {
  toastMessage: { message: '', status: '' },
};

function commonUIReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    case types.SET_TOAST_MESSAGE:
      return {
        ...state,
        toastMessage: { message: payload.message, status: payload.status },
      };
    default:
      return state;
  }
}

export default commonUIReducer;
