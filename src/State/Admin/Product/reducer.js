import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_BY_ID_FAILURE,
  DELETE_PRODUCT_BY_ID_REQUEST,
  DELETE_PRODUCT_BY_ID_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  RESET_UPDATED_PRODUCT,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./actionType";

const initialState = {
  allProducts: null,
  createdProduct: null,
  deletedProduct: null,
  updatedProduct: null,
  loading: false,
  error: null,
};

export const adminProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_BY_ID_REQUEST:
    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case GET_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };

    case RESET_UPDATED_PRODUCT:
      return {
        ...state,
        updatedProduct: null,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        createdProduct: action.payload,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        updatedProduct: action.payload,
      };

    case DELETE_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedProduct: action.payload,
      };

    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.payload,
        loading: false,
        error: null,
      };

    case DELETE_PRODUCT_BY_ID_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case GET_ALL_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
