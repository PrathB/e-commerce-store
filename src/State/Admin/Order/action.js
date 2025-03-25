import { api } from "../../../config/apiConfig";
import {
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQUEST,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVER_ORDER_FAILURE,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./actionType";

const getOrdersRequest = () => ({ type: GET_ORDERS_REQUEST });
const getOrdersSuccess = (orders) => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
});
const getOrdersFailure = (error) => ({
  type: GET_ORDERS_FAILURE,
  payload: error,
});

export const getOrders = () => async (dispatch) => {
  dispatch(getOrdersRequest());
  try {
    const response = await api.get("/api/admin/orders");
    dispatch(getOrdersSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(getOrdersFailure(errorMsg));
  }
};

const confirmOrderRequest = () => ({ type: CONFIRM_ORDER_REQUEST });
const confirmOrderSuccess = (orderId) => ({
  type: CONFIRM_ORDER_SUCCESS,
  payload: orderId,
});
const confirmOrderFailure = (error) => ({
  type: CONFIRM_ORDER_FAILURE,
  payload: error,
});

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch(confirmOrderRequest());
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    console.log("confirmed order:", response.data);
    dispatch(confirmOrderSuccess(response.data._id));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(confirmOrderFailure(errorMsg));
  }
};

const shipOrderRequest = () => ({ type: SHIP_ORDER_REQUEST });
const shipOrderSuccess = (orderId) => ({
  type: SHIP_ORDER_SUCCESS,
  payload: orderId,
});
const shipOrderFailure = (error) => ({
  type: SHIP_ORDER_FAILURE,
  payload: error,
});

export const shipOrder = (orderId) => async (dispatch) => {
  dispatch(shipOrderRequest());
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/shipped`);
    console.log("shipped order:", response.data);
    dispatch(shipOrderSuccess(response.data._id));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(shipOrderFailure(errorMsg));
  }
};

const deliverOrderRequest = () => ({ type: DELIVER_ORDER_REQUEST });
const deliverOrderSuccess = (orderId) => ({
  type: DELIVER_ORDER_SUCCESS,
  payload: orderId,
});
const deliverOrderFailure = (error) => ({
  type: DELIVER_ORDER_FAILURE,
  payload: error,
});

export const deliverOrder = (orderId) => async (dispatch) => {
  dispatch(deliverOrderRequest());
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/delivered`);
    console.log("delivered order:", response.data);
    dispatch(deliverOrderSuccess(response.data._id));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(deliverOrderFailure(errorMsg));
  }
};

const cancelOrderRequest = () => ({ type: CANCEL_ORDER_REQUEST });
const cancelOrderSuccess = (orderId) => ({
  type: CANCEL_ORDER_SUCCESS,
  payload: orderId,
});
const cancelOrderFailure = (error) => ({
  type: CANCEL_ORDER_FAILURE,
  payload: error,
});

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch(cancelOrderRequest());
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/cancelled`);
    console.log("cancelled order:", response.data);
    dispatch(cancelOrderSuccess(response.data._id));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(cancelOrderFailure(errorMsg));
  }
};

const deleteOrderRequest = () => ({ type: DELETE_ORDER_REQUEST });
const deleteOrderSuccess = (orderId) => ({
  type: DELETE_ORDER_SUCCESS,
  payload: orderId,
});
const deleteOrderFailure = (error) => ({
  type: DELETE_ORDER_FAILURE,
  payload: error,
});

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch(deleteOrderRequest());
  try {
    await api.delete(`/api/admin/orders/${orderId}/delete`);
    console.log(orderId);
    dispatch(deleteOrderSuccess(orderId));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(deleteOrderFailure(errorMsg));
  }
};
