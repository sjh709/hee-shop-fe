import * as types from '../../constants/product.constants';
import { ProductListType } from '../../model/product';

interface StateType {
  loading: boolean;
  error: string;
  productList: ProductListType[] | [];
  totalPageNum: number;
}

interface ActionType {
  type: string;
  payload?: any;
}

const initialState = {
  loading: false,
  error: '',
  productList: [],
  totalPageNum: 1,
};

function productReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_CREATE_REQUEST:
    case types.PRODUCT_GET_REQUEST:
      return { ...state, loading: true };
    case types.PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, error: '' };
    case types.PRODUCT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        productList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    case types.PRODUCT_CREATE_FAIL:
    case types.PRODUCT_GET_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default productReducer;
