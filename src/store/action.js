import { SET_PRODUCTS } from './contants';

export const setProducts = payload => {
  return {
    type: SET_PRODUCTS,
    payload: payload,
  };
};
