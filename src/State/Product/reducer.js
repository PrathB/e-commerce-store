import {
  CREATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_BY_ID_FAILURE,
  DELETE_PRODUCT_BY_ID_REQUEST,
  DELETE_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from "./actionType";

const initialState = {
  pageData: { content: [], currentPage: 0, totalPages: 0 },
  product: null,
  deletedProduct: null,
  loading: false,
  error: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCT_BY_ID_REQUEST:
    case GET_PRODUCTS_REQUEST:
    case DELETE_PRODUCT_BY_ID_REQUEST:
    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, product: action.payload };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        pageData: action.payload,
      };

    case DELETE_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedProduct: action.payload,
      };

    case FIND_PRODUCT_BY_ID_FAILURE:
    case GET_PRODUCTS_FAILURE:
    case DELETE_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
