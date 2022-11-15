import axios from "axios";
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

export const getCartItems = (token) => async (dispatch) => {
  dispatch({ type: GET_CART_ITEMS_LOADING });
  try {
    const res = await axios.get(`/carts`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({ type: GET_CART_ITEMS_ERROR });
  }
};

export const addItemToCart = (token, _id) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_LOADING });
  try {
    const res = await axios.post(
      `/carts`,
      {
        product_id: _id,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: res.data });
  } catch (error) {
    // console.log(error);
    return dispatch({ type: ADD_ITEM_TO_CART_ERROR });
  }
};

export const updateCartItem = (id, quantity, token) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEMS_LOADING });
  try {
    const res = await axios.patch(
      `/carts/${id}`,

      quantity,

      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return dispatch({ type: UPDATE_CART_ITEMS_SUCCESS, payload: res.data });
  } catch (error) {
    // console.log(error);
    return dispatch({ type: UPDATE_CART_ITEMS_ERROR });
  }
};

export const removeCartItem = (id, token) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEMS_LOADING });
  try {
    const res = await axios.delete(`/carts/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return dispatch({ type: REMOVE_CART_ITEMS_SUCCESS, payload: res.data });
  } catch (error) {
    return dispatch({ type: REMOVE_CART_ITEMS_ERROR });
  }
};

export const getCartTotal = () => {
  return { type: CART_TOTAL };
};
export const setCartTotal = () => {
  return { type: SET_CART_TOTAL };
};

export const updateCartTotal = (promo) => {
  return { type: UPDATE_CART_TOTAL, payload: promo };
};

export const setDeliveryAddress = (address) => {
  return { type: SET_DELIVERY_ADDRESS, payload: address };
};

export const resetCart = () => {
  return { type: RESET_CART_ITEMS };
};
