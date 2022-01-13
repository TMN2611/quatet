import { SET_PRODUCTS } from './contants';
const initialState = {
  products: [],
  carts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
  }
}

export { initialState };
export default reducer;
