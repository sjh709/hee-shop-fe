import * as types from '../../constants/order.constants';
import { GetOrderListType, GetOrderType } from '../../model/order';

interface ActionType {
  type: string;
  payload?: any;
}

interface StateType {
  loading: boolean;
  error: string;
  orderNum: string;
  orderList: GetOrderType[];
  adminOrderList: GetOrderListType[];
  totalPageNum: number;
}

const initialState = {
  loading: false,
  error: '',
  orderNum: '',
  orderList: [],
  adminOrderList: [],
  totalPageNum: 1,
};

function orderReducer(
  state: StateType = initialState,
  action: ActionType
): StateType {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
    case types.GET_ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, orderNum: payload };
    case types.GET_ORDER_SUCCESS:
      return { ...state, loading: false, orderList: payload };
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        adminOrderList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
    case types.GET_ORDER_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default orderReducer;
