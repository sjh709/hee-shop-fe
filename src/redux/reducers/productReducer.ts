import * as types from '../../constants/product.constants';

interface StateType {
  loading: boolean;
  error: string;
}

interface ActionType {
  type: string;
  payload?: any;
}

const initialState = {
  loading: false,
  error: '',
};

function productReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case types.PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, error: '' };
    case types.PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default productReducer;
