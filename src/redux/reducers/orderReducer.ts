import * as types from '../../constants/order.constants';
import { GetOrderType } from '../../model/order';

interface ActionType {
  type: string;
  payload?: any;
}

interface StateType {
  loading: boolean;
  error: string;
  orderNum: string;
  orderList: GetOrderType[];
}

const initialState = {
  loading: false,
  error: '',
  orderNum: '',
  orderList: [],
};

function orderReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, orderNum: payload };
    case types.GET_ORDER_SUCCESS:
      return { ...state, loading: false, orderList: payload };
    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default orderReducer;
