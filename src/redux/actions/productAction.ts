import { CreateProductType, SearchQueryType } from '../../model/product';
import { Dispatch } from 'redux';
import * as types from '../../constants/product.constants';
import api from '../../utils/api';
import { commonUIActions } from './commonUIAction';

interface ErrorType {
  type: string;
  error: string;
}

function createProduct({ formData }: CreateProductType): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.PRODUCT_CREATE_REQUEST });
      const response = await api.post('/product', formData);
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({ type: types.PRODUCT_CREATE_SUCCESS });
      dispatch(commonUIActions.showToastMessage('상품 생성 완료', 'success'));
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: err.error });
      dispatch(commonUIActions.showToastMessage(err.error, 'error'));
    }
  };
}

function getProductList(query: SearchQueryType): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.PRODUCT_GET_REQUEST });
      const response = await api.get('/product', {
        params: { ...query },
      });
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({
        type: types.PRODUCT_GET_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.PRODUCT_GET_FAIL, payload: err.error });
    }
  };
}

export const productActions = { createProduct, getProductList };
