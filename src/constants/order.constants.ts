import { BadgeBgType } from '../model/order';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAIL = 'GET_ORDER_FAIL';
export const GET_ORDER_LIST_REQUEST = 'GET_ORDER_LIST_REQUEST';
export const GET_ORDER_LIST_SUCCESS = 'GET_ORDER_LIST_SUCCESS';
export const GET_ORDER_LIST_FAIL = 'GET_ORDER_LIST_FAIL';
export const badgeBg: BadgeBgType = {
  preparing: 'primary',
  shipping: 'warning',
  refund: 'danger',
  delivered: 'success',
};
