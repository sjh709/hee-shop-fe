import { Dispatch } from 'redux';
import * as types from '../../constants/cart.constants';
import api from '../../utils/api';
import { commonUIActions } from './commonUIAction';

interface ErrorType {
  type: string;
  error: string;
}

function addToCart({
  id,
  size,
}: {
  id: string | undefined;
  size: string;
}): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.ADD_TO_CART_REQUEST });
      const response = await api.post('/cart', { productId: id, size, qty: 1 });
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({
        type: types.ADD_TO_CART_SUCCESS,
        payload: response.data.cartItemQty,
      });
      dispatch(commonUIActions.showToastMessage('상품 추가 완료', 'success'));
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.ADD_TO_CART_FAIL, payload: err.error });
      dispatch(commonUIActions.showToastMessage(err.error, 'error'));
    }
  };
}

function getCartList(): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.GET_CART_LIST_REQUEST });
      const response = await api.get('/cart');
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({
        type: types.GET_CART_LIST_SUCCESS,
        payload: response.data.data,
      });
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.GET_CART_LIST_FAIL, payload: err.error });
    }
  };
}

export const cartActions = { addToCart, getCartList };
