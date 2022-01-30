import {
  SET_PRODUCTS,
  SET_CARTS,
  ADD_TO_CARTS,
  DELETE_FROM_CARTS,
  CHANGE_QUANTITY,
} from './contants';
const initialState = {
  products: [],
  carts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case SET_CARTS:
      console.log('haha', state.products);
      const itemInCartsID = action.payload.map(item => {
        return item.id;
      });
      console.log(itemInCartsID);
      const Products = state.products.map(function (product) {
        if (itemInCartsID.includes(product.id)) {
          console.log(product.id);

          return { ...product, isInCarts: !product.id ? false : true };
        } else {
          return product;
        }
      });
      console.log(Products);

      return { products: Products, carts: action.payload };
    case ADD_TO_CARTS:
      const newProduct = state.products.map(function (product) {
        if (product.id === action.payload.id) {
          return { ...product, isInCarts: product.isInCarts ? false : true };
        } else {
          return product;
        }
      });

      const newCarts = state.carts;
      if (action.payload.isInCarts) {
        newCarts.forEach(function (product, index) {
          if (product.id === action.payload.id) {
            newCarts.splice(index, 1);
          }
        });
      } else {
        newCarts.push({ ...action.payload, quantity: 1 });
      }
      const CartsAdd = JSON.stringify(newCarts);
      localStorage.setItem('carts', CartsAdd);

      return { products: newProduct, carts: newCarts };
    case DELETE_FROM_CARTS:
      const newProductDFdelete = state.products.map(function (product) {
        if (product.id === action.payload.id) {
          return { ...product, isInCarts: false };
        } else {
          return product;
        }
      });
      const newCartsBFdelete = state.carts;

      newCartsBFdelete.forEach(function (product, index) {
        if (product.id === action.payload.id) {
          newCartsBFdelete.splice(index, 1);
        }
      });
      const CartsDelete = JSON.stringify(newCartsBFdelete);
      localStorage.setItem('carts', CartsDelete);
      return { products: newProductDFdelete, carts: newCartsBFdelete };
    case CHANGE_QUANTITY:
      console.log('Increasing quantity', action.payload);
      const changeQuantity = state.carts.map((item, index) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.currentQuanty };
        }
        return item;
      });
      const CartsChange = JSON.stringify(changeQuantity);
      localStorage.setItem('carts', CartsChange);

      return { ...state, carts: changeQuantity };

    default:
      return state;
  }
}

export { initialState };
export default reducer;
