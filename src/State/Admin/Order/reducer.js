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

const initialState = {
  loading: false,
  orders: [],
  confirmed: null,
  shipped: null,
  delivered: null,
  cancelled: null,
  deleted: null,
  error: null,
};

export const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
    case CONFIRM_ORDER_REQUEST:
    case SHIP_ORDER_REQUEST:
    case DELIVER_ORDER_REQUEST:
    case CANCEL_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };
    case CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        confirmed: action.payload,
      };
    case SHIP_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        shipped: action.payload,
      };
    case DELIVER_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        delivered: action.payload,
      };
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        cancelled: action.payload,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: action.payload,
      };

    case GET_ORDERS_FAILURE:
    case CONFIRM_ORDER_FAILURE:
    case SHIP_ORDER_FAILURE:
    case DELIVER_ORDER_FAILURE:
    case CANCEL_ORDER_FAILURE:
    case DELETE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
