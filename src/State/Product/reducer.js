import {
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  GET_FEATURED_PRODUCTS_FAILURE,
  GET_FEATURED_PRODUCTS_REQUEST,
  GET_FEATURED_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from "./actionType";

const initialState = {
  pageData: { content: [], currentPage: 0, totalPages: 0 },
  product: null,
  featured: [],
  loading: false,
  error: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
    case GET_FEATURED_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null, product: null };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, product: action.payload };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        pageData: action.payload,
      };

    case GET_FEATURED_PRODUCTS_SUCCESS:
      return {
        ...state,
        featured: action.payload,
        loading: false,
        error: null,
      };

    case FIND_PRODUCT_BY_ID_FAILURE:
    case GET_PRODUCTS_FAILURE:
    case GET_FEATURED_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
