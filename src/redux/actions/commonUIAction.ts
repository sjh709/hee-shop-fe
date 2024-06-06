import { Dispatch } from 'redux';
import * as types from '../../constants/commonUI.constants';

function showToastMessage(message: string, status: string): any {
  return async (dispatch: Dispatch) => {
    dispatch({ type: types.SET_TOAST_MESSAGE, payload: { message, status } });
  };
}

export const commonUIActions = {
  showToastMessage,
};
