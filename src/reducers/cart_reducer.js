import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
      // o id sera o id + color, pois podem existir productos iguais e cores diferentes
      const tempProduct = state.cart.find((p) => p.id === id + color);
      if (tempProduct) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return {
          ...state,
          cart: tempCart,
        };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }
    case REMOVE_CART_ITEM:
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cart: filteredCart,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: itemId, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === itemId) {
          let newAmount;
          if (value === 'inc') {
            newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
          } else {
            newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
          }
          item.amount = newAmount;
        }
        return item;
      });
      return {
        ...state,
        cart: tempCart,
      };
    case COUNT_CART_TOTALS:
      const { totalItems, totalAmount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;
          total.totalItems += amount;
          total.totalAmount += amount * price;
          return total;
        },
        {
          totalItems: 0,
          totalAmount: 0,
        }
      );

      return {
        ...state,
        totalItems,
        totalAmount,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
