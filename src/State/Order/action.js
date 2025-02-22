import { api } from "../../config/apiConfig";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  FIND_ORDER_BY_ID_FAILURE,
  FIND_ORDER_BY_ID_REQUEST,
  FIND_ORDER_BY_ID_SUCCESS,
  GET_USER_ORDER_HISTORY_FAILURE,
  GET_USER_ORDER_HISTORY_REQUEST,
  GET_USER_ORDER_HISTORY_SUCCESS,
} from "./actionType";

const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});
const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

export const createOrder = (shippingAddress, navigate) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const response = await api.post("/api/orders", shippingAddress);
    if (response.data._id) {
      navigate({ search: `step=3&orderId=${response.data._id}` });
    }
    dispatch(createOrderSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(createOrderFailure(errorMsg));
  }
};

const findOrderByIdRequest = () => ({ type: FIND_ORDER_BY_ID_REQUEST });
const findOrderByIdSuccess = (order) => ({
  type: FIND_ORDER_BY_ID_SUCCESS,
  payload: order,
});
const findOrderByIdFailure = (error) => ({
  type: FIND_ORDER_BY_ID_FAILURE,
  payload: error,
});

export const findOrderById = (orderId) => async (dispatch) => {
  dispatch(findOrderByIdRequest());
  try {
    const response = await api.get(`/api/orders/${orderId}`);
    dispatch(findOrderByIdSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(findOrderByIdFailure(errorMsg));
  }
};

const getUserOrderHistoryRequest = () => ({
  type: GET_USER_ORDER_HISTORY_REQUEST,
});
const getUserOrderHistorySuccess = (orderArr) => ({
  type: GET_USER_ORDER_HISTORY_SUCCESS,
  payload: orderArr,
});
const getUserOrderHistoryFailure = (error) => ({
  type: GET_USER_ORDER_HISTORY_FAILURE,
  payload: error,
});

export const getUserOrderHistory = () => async (dispatch) => {
  dispatch(getUserOrderHistoryRequest());
  try {
    const response = await api.get(`/api/orders/user`);
    dispatch(getUserOrderHistorySuccess(response.data));
    console.log(response.data);
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(getUserOrderHistoryFailure(errorMsg));
  }
};
