import { GET_FEATURED_PRODUCTS_REQUEST } from "../../Product/actionType";
import {
  ADD_PRODUCTS_TO_FEATURED_FAILURE,
  ADD_PRODUCTS_TO_FEATURED_REQUEST,
  ADD_PRODUCTS_TO_FEATURED_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_BY_ID_FAILURE,
  DELETE_PRODUCT_BY_ID_REQUEST,
  DELETE_PRODUCT_BY_ID_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_NON_FEATURED_PRODUCTS_FAILURE,
  GET_NON_FEATURED_PRODUCTS_SUCCESS,
  REMOVE_PRODUCT_FROM_FEATURED_FAILURE,
  REMOVE_PRODUCT_FROM_FEATURED_REQUEST,
  REMOVE_PRODUCT_FROM_FEATURED_SUCCESS,
  RESET_UPDATED_PRODUCT,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./actionType";

const initialState = {
  allProducts: null,
  nonFeaturedProducts: [],
  createdProduct: null,
  deletedProduct: null,
  updatedProduct: null,
  addedFeaturedProducts: [],
  removedFeaturedProduct: null,
  loading: false,
  error: null,
};

export const adminProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_BY_ID_REQUEST:
    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case GET_ALL_PRODUCTS_REQUEST:
    case GET_FEATURED_PRODUCTS_REQUEST:
    case ADD_PRODUCTS_TO_FEATURED_REQUEST:
    case REMOVE_PRODUCT_FROM_FEATURED_REQUEST:
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

    case GET_NON_FEATURED_PRODUCTS_SUCCESS:
      return {
        ...state,
        nonFeaturedProducts: action.payload,
        loading: false,
        error: null,
      };

    case ADD_PRODUCTS_TO_FEATURED_SUCCESS:
      return {
        ...state,
        addedFeaturedProducts: action.payload,
        loading: false,
        error: null,
      };

    case REMOVE_PRODUCT_FROM_FEATURED_SUCCESS:
      return {
        ...state,
        removedFeaturedProduct: action.payload,
        loading: false,
        error: null,
      };

    case DELETE_PRODUCT_BY_ID_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case GET_ALL_PRODUCTS_FAILURE:
    case GET_NON_FEATURED_PRODUCTS_FAILURE:
    case ADD_PRODUCTS_TO_FEATURED_FAILURE:
    case REMOVE_PRODUCT_FROM_FEATURED_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
