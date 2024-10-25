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

export const findUserCart = (reqData) => async (dispatch) => {
  dispatch(findUserCartRequest());
  try {
    const cart = await api.put(`/api/cart`, reqData.data);
    dispatch(findUserCartSuccess(cart));
  } catch (error) {
    dispatch(findUserCartFailure(error.message));
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

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch(addItemToCartRequest());
  try {
    const cartItem = await api.put(`/api/cart/add`, reqData.data);
    dispatch(addItemToCartSuccess(cartItem));
  } catch (error) {
    dispatch(addItemToCartFailure(error.message));
  }
};

const removeCartItemRequest = () => ({ type: REMOVE_CART_ITEM_REQUEST });
const removeCartItemSuccess = (cartItemId) => ({
  type: REMOVE_CART_ITEM_SUCCESS,
  payload:cartItemId
});
const removeCartItemFailure = (error) => ({
  type: REMOVE_CART_ITEM_FAILURE,
  payload: error,
});

export const removeCartItem = (reqData) => async (dispatch) => {
  dispatch(removeCartItemRequest());
  const cartItemId = reqData.cartItemId;
  try {
    await api.delete(`/api/cart_items/${cartItemId}`);
    dispatch(removeCartItemSuccess(cartItemId));
  } catch (error) {
    dispatch(removeCartItemFailure(error.message));
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

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch(updateCartItemRequest());
  c;
  const cartItemId = reqData.cartItemId;
  try {
    const cartItem = await api.put(
      `/api/cart_items/${cartItemId}`,
      reqData.data
    );
    dispatch(updateCartItemSuccess(cartItem));
  } catch (error) {
    dispatch(updateCartItemFailure(error.message));
  }
};
