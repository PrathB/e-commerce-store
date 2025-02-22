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

const initialState = {
  order: null,
  orders: [],
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case FIND_ORDER_BY_ID_REQUEST:
    case GET_USER_ORDER_HISTORY_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_ORDER_SUCCESS:
    case FIND_ORDER_BY_ID_SUCCESS:
      return { ...state, order: action.payload, loading: false, error: null };

    case GET_USER_ORDER_HISTORY_SUCCESS:
      return { ...state, orders: action.payload, loading: false, error: null };

    case CREATE_ORDER_FAILURE:
    case FIND_ORDER_BY_ID_FAILURE:
    case GET_USER_ORDER_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
