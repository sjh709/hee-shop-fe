import { CreateProductType, EditProductType } from '../../model/product';
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

function getProductList(query: {
  page: string;
  name?: string;
  pageSize: number;
}): any {
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

function editProduct(formData: EditProductType, id: string): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.PRODUCT_EDIT_REQUEST });
      const response = await api.put(`/product/${id}`, formData);
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({
        type: types.PRODUCT_EDIT_SUCCESS,
        payload: response.data.data,
      });
      dispatch(commonUIActions.showToastMessage('상품 수정 완료', 'success'));
      dispatch(getProductList({ page: '1', name: '', pageSize: 3 }));
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: err.error });
    }
  };
}

function deleteProduct(id: string): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.PRODUCT_DELETE_REQUEST });
      const response = await api.delete(`/product/${id}`);
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({ type: types.PRODUCT_DELETE_SUCCESS });
      dispatch(commonUIActions.showToastMessage('상품 삭제 완료', 'success'));
      dispatch(getProductList({ page: '1', pageSize: 3 }));
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: err.error });
    }
  };
}

function getProductDetail(id: string | undefined): any {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
      const response = await api.get(`/product/${id}`);
      if (response.status !== 200) throw new Error(response.data.error);
      dispatch({
        type: types.GET_PRODUCT_DETAIL_SUCCESS,
        payload: response.data.data,
      });
    } catch (e) {
      const err = e as ErrorType;
      dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: err.error });
      dispatch(commonUIActions.showToastMessage(err.error, 'error'));
    }
  };
}

export const productActions = {
  createProduct,
  getProductList,
  editProduct,
  deleteProduct,
  getProductDetail,
};
