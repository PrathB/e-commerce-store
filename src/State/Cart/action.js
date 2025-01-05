import { api } from "../../config/apiConfig";
import {
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  FIND_USER_CART_REQUEST,
  FIND_USER_CART_SUCCESS,
  FIND_USER_CART_FAILURE,
} from "./actionType";

const findUserCartRequest = () => ({ type: FIND_USER_CART_REQUEST });
const findUserCartSuccess = (cart) => ({
  type: FIND_USER_CART_SUCCESS,
  payload: cart,
});
const findUserCartFailure = (error) => ({
  type: FIND_USER_CART_FAILURE,
  payload: error,
});

export const findUserCart = () => async (dispatch) => {
  dispatch(findUserCartRequest());
  try {
    const response = await api.put(`/api/cart`);
    dispatch(findUserCartSuccess(response.data));
    console.log("Cart:", response.data);
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(findUserCartFailure(errorMsg));
  }
};

const addItemToCartRequest = () => ({ type: ADD_ITEM_TO_CART_REQUEST });
const addItemToCartSuccess = (cartItem) => ({
  type: ADD_ITEM_TO_CART_SUCCESS,
  payload: cartItem,
});
const addItemToCartFailure = (error) => ({
  type: ADD_ITEM_TO_CART_FAILURE,
  payload: error,
});

export const addItemToCart = (data) => async (dispatch) => {
  dispatch(addItemToCartRequest());
  try {
    const response = await api.put(`/api/cart/add`, data);
    dispatch(addItemToCartSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(addItemToCartFailure(errorMsg));
  }
};

const removeCartItemRequest = () => ({ type: REMOVE_CART_ITEM_REQUEST });
const removeCartItemSuccess = (cartItemId) => ({
  type: REMOVE_CART_ITEM_SUCCESS,
  payload: cartItemId,
});
const removeCartItemFailure = (error) => ({
  type: REMOVE_CART_ITEM_FAILURE,
  payload: error,
});

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch(removeCartItemRequest());
  try {
    await api.delete(`/api/cart_items/${cartItemId}`);
    dispatch(removeCartItemSuccess(cartItemId));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(removeCartItemFailure(errorMsg));
  }
};

const updateCartItemRequest = () => ({ type: UPDATE_CART_ITEM_REQUEST });
const updateCartItemSuccess = (cartItem) => ({
  type: UPDATE_CART_ITEM_SUCCESS,
  payload: cartItem,
});
const updateCartItemFailure = (error) => ({
  type: UPDATE_CART_ITEM_FAILURE,
  payload: error,
});

export const updateCartItem = (cartItemId, data) => async (dispatch) => {
  dispatch(updateCartItemRequest());
  try {
    const response = await api.put(`/api/cart_items/${cartItemId}`, data);
    dispatch(updateCartItemSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(updateCartItemFailure(errorMsg));
  }
};
