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

function deleteCartItem(id: string): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
      const response = await api.delete(`/cart/${id}`);
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({
        type: types.DELETE_CART_ITEM_SUCCESS,
        payload: response.data.cartItemQty,
      });
      dispatch(getCartList());
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: err.error });
    }
  };
}

function updateQty(id: string, value: string): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
      const response = await api.put(`/cart/${id}`, { qty: value });
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({
        type: types.UPDATE_CART_ITEM_SUCCESS,
        payload: response.data.data,
      });
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: err.error });
      dispatch(commonUIActions.showToastMessage(err.error, 'error'));
    }
  };
}

export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
};
