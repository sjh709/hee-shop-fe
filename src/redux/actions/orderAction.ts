import { Dispatch } from 'redux';
import { CreateOrderPropsType } from '../../model/order';
import * as types from '../../constants/order.constants';
import api from '../../utils/api';
import { commonUIActions } from './commonUIAction';
import { cartActions } from './cartAction';
import { NavigateFunction } from 'react-router-dom';

interface ErrorType {
  type: string;
  error: string;
}

function createOrder(
  data: CreateOrderPropsType,
  navigate: NavigateFunction
): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.CREATE_ORDER_REQUEST });
      const response = await api.post('/order', data);
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({
        type: types.CREATE_ORDER_SUCCESS,
        payload: response.data.orderNum,
      });
      dispatch(cartActions.getCartQty());
      navigate('/payment/success');
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.CREATE_ORDER_FAIL, payload: err.error });
      dispatch(commonUIActions.showToastMessage(err.error, 'error'));
    }
  };
}

export const orderActions = {
  createOrder,
};
