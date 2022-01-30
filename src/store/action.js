import {
  SET_PRODUCTS,
  ADD_TO_CARTS,
  DELETE_FROM_CARTS,
  CHANGE_QUANTITY,
  SET_CARTS,
} from './contants';

export const setProducts = payload => {
  return {
    type: SET_PRODUCTS,
    payload: payload,
  };
};
export const setCarts = payload => {
  return {
    type: SET_CARTS,
    payload: payload,
  };
};
export const addToCarts = payload => {
  return {
    type: ADD_TO_CARTS,
    payload: payload,
  };
};
export const deleteFromCarts = payload => {
  return {
    type: DELETE_FROM_CARTS,
    payload: payload,
  };
};
export const changeQuantity = payload => {
  return {
    type: CHANGE_QUANTITY,
    payload: payload,
  };
};
