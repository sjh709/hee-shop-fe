import * as types from '../../constants/cart.constants';
import { CartListType } from '../../model/cart';

interface ActionType {
  type: string;
  payload?: any;
}

interface StateType {
  loading: boolean;
  error: string;
  cartItemQty: number;
  cartList: CartListType[];
  totalPrice: number;
}

const initialState = {
  loading: false,
  error: '',
  cartItemQty: 0,
  cartList: [],
  totalPrice: 0,
};

function cartReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART_REQUEST:
    case types.GET_CART_LIST_REQUEST:
      return { ...state, loading: true };
    case types.ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, cartItemQty: payload };
    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        cartList: payload,
        totalPrice: payload.reduce(
          (total: number, item: CartListType) =>
            (total += item.productId.price * item.qty),
          0
        ),
      };
    case types.ADD_TO_CART_FAIL:
    case types.GET_CART_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default cartReducer;
