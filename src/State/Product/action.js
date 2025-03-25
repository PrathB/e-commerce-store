import { api } from "../../config/apiConfig";
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

const findProductByIdRequest = () => ({ type: FIND_PRODUCT_BY_ID_REQUEST });
const findProductByIdSuccess = (product) => ({
  type: FIND_PRODUCT_BY_ID_SUCCESS,
  payload: product,
});
const findProductByIdFailure = (error) => ({
  type: FIND_PRODUCT_BY_ID_FAILURE,
  payload: error,
});

export const findProductById = (productId) => async (dispatch) => {
  dispatch(findProductByIdRequest());
  try {
    const response = await api.get(`/api/products/product/${productId}`);
    dispatch(findProductByIdSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(findProductByIdFailure(errorMsg));
  }
};

const getProductsRequest = () => ({ type: GET_PRODUCTS_REQUEST });
const getProductsSuccess = (pageData) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: pageData,
});
const getProductsFailure = (error) => ({
  type: GET_PRODUCTS_FAILURE,
  payload: error,
});

export const getProducts = (data) => async (dispatch) => {
  dispatch(getProductsRequest());
  const {
    category,
    carMake,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = data;
  try {
    console.log(data);
    const response = await api.get(
      `/api/products?category=${category}&carMake=${carMake}&minPrice=${minPrice}&maxPrice=${maxPrice}
      &minDiscount=${minDiscount}&sort=${sort}&stock=${stock}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    console.log(response.data);
    dispatch(getProductsSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    console.log(errorMsg);
    dispatch(getProductsFailure(errorMsg));
  }
};

const getFeaturedProductsRequest = () => ({
  type: GET_FEATURED_PRODUCTS_REQUEST,
});
const getFeaturedProductsSuccess = (productArr) => ({
  type: GET_FEATURED_PRODUCTS_SUCCESS,
  payload: productArr,
});
const getFeaturedProductsFailure = (error) => ({
  type: GET_FEATURED_PRODUCTS_FAILURE,
  payload: error,
});

export const getFeaturedProducts = () => async (dispatch) => {
  dispatch(getFeaturedProductsRequest());
  try {
    const response = await api.get("api/products/featured");
    dispatch(getFeaturedProductsSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(getFeaturedProductsFailure(errorMsg));
  }
};
