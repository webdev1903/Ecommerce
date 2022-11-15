import {
  GET_CART_ITEMS_LOADING,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_ERROR,
  ADD_ITEM_TO_CART_LOADING,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_ERROR,
  UPDATE_CART_ITEMS_LOADING,
  UPDATE_CART_ITEMS_SUCCESS,
  UPDATE_CART_ITEMS_ERROR,
  REMOVE_CART_ITEMS_LOADING,
  REMOVE_CART_ITEMS_SUCCESS,
  REMOVE_CART_ITEMS_ERROR,
  RESET_CART_ITEMS,
  CART_TOTAL,
  UPDATE_CART_TOTAL,
  SET_CART_TOTAL,
  SET_DELIVERY_ADDRESS,
} from "./cart.types";

const initialState = {
  getCartItems: {
    loading: false,
    error: false,
  },
  addItemToCart: {
    loading: false,
    error: false,
  },
  updateCart: {
    loading: false,
    error: false,
  },
  removeCartItem: {
    loading: false,
    error: false,
  },
  data: [],
  discount: 0,
  subtotal: 0,
  total: 0,
  promoCode: "",
  address: {},
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CART_ITEMS_LOADING:
      return { ...state, getCartItems: { loading: true, error: false } };
    case GET_CART_ITEMS_SUCCESS:
      let total = 0;
      // payload.reduce((a, b) => {
      //   let x = a.product_id;
      //   let y = b.product_id;
      //   return {
      //     x: a.quantity * x.price + b.quantity * y.price,
      //   };
      // });
      for (let i = 0; i < payload.length; i++) {
        total += payload[i].quantity * payload[i].product_id.price;
      }
      return {
        ...state,
        data: payload,
        subtotal: total.toFixed(2),
        total:
          state.discount === 0
            ? total.toFixed(2)
            : (total.toFixed(2) * 0.8).toFixed(2),
        getCartItems: { loading: false, error: false },
      };
    case GET_CART_ITEMS_ERROR:
      return { ...state, getCartItems: { loading: false, error: true } };
    case ADD_ITEM_TO_CART_LOADING: {
      return { ...state, addCartItem: { loading: true, error: false } };
    }
    case ADD_ITEM_TO_CART_SUCCESS: {
      let sum = payload.product_id.price * payload.quantity;
      return {
        ...state,
        data: [...state.data, payload],
        subtotal: state.subtotal + sum.toFixed(2),
        total: state.total + sum.toFixed(2),
        addCartItem: { loading: false },
      };
    }
    case ADD_ITEM_TO_CART_ERROR: {
      return { ...state, addCartItem: { loading: false, error: true } };
    }
    case UPDATE_CART_ITEMS_LOADING: {
      return { ...state, updateCartItem: { loading: true, error: false } };
    }
    case UPDATE_CART_ITEMS_SUCCESS: {
      const newItems = state.data.map((cI) => {
        if (cI._id === payload._id) {
          return payload;
        } else return cI;
      });
      let total = 0;
      for (let i = 0; i < newItems.length; i++) {
        total += newItems[i].quantity * newItems[i].product_id.price;
      }
      return {
        ...state,
        data: newItems,
        subtotal: total.toFixed(2),
        total:
          state.discount === 0
            ? total.toFixed(2)
            : (total.toFixed(2) * 0.8).toFixed(2),
        updateCartItem: { loading: false },
      };
    }
    case UPDATE_CART_ITEMS_ERROR: {
      return { ...state, updateCartItem: { loading: false, error: true } };
    }
    case REMOVE_CART_ITEMS_LOADING: {
      return { ...state, removeCartItem: { loading: true, error: false } };
    }
    case REMOVE_CART_ITEMS_SUCCESS: {
      const newItems = state.data.filter((cI) => cI._id !== payload._id);
      let sub = payload.product_id.price * payload.quantity;
      return {
        ...state,
        data: newItems,
        subtotal: state.subtotal - sub,
        total: state.subtotal - sub,
        removeCartItem: { loading: false },
      };
    }
    case REMOVE_CART_ITEMS_ERROR: {
      return { ...state, removeCartItem: { loading: false, error: true } };
    }
    case CART_TOTAL: {
      let sum = 0;
      let data = state.data;
      sum = data.reduce((a, b) => {
        return {
          x: a.quantity * a.product_id.price + b.quantity * b.product_id.price,
        };
      });
      console.log("sum", sum);
      return { ...state, subtotal: sum.x.toFixed(2), total: sum.x.toFixed(2) };
    }
    case UPDATE_CART_TOTAL: {
      return {
        ...state,
        total: (state.subtotal * 0.8).toFixed(2),
        discount: "20 %",
        promoCode: payload,
      };
    }
    case RESET_CART_ITEMS:
      return initialState;
    case SET_CART_TOTAL:
      return { ...state, total: state.subtotal, discount: 0, promoCode: "" };
    case SET_DELIVERY_ADDRESS:
      return { ...state, address: payload };
    default: {
      return state;
    }
  }
};
