import * as types from '../../constants/cart.constants';

interface ActionType {
  type: string;
  payload?: any;
}

interface StateType {
  loading: boolean;
  error: string;
  cartItemQty: number;
}

const initialState = {
  loading: false,
  error: '',
  cartItemQty: 0,
};

function cartReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART_REQUEST:
      return { ...state, loading: true };
    case types.ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, cartItemQty: payload };
    case types.ADD_TO_CART_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default cartReducer;
