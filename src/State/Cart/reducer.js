import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  FIND_USER_CART_FAILURE,
  FIND_USER_CART_REQUEST,
  FIND_USER_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./actionType";

const initialState = {
  cart: null,
  loading: false,
  error: null,
  addedCartItem: null,
  updatedCartItem: null,
  removedCartItem: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_USER_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ITEM_TO_CART_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_USER_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };
    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        addedCartItem: action.payload,
      };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        removedCartItem: action.payload,
      };
    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        updatedCartItem: action.payload,
      };

    case FIND_USER_CART_FAILURE:
    case ADD_ITEM_TO_CART_FAILURE:
    case REMOVE_CART_ITEM_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
