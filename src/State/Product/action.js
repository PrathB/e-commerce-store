import { api } from "../../config/apiConfig";
import {
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
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
export const findProductById = (reqData) => async (dispatch) => {
  dispatch(findProductByIdRequest());
  const productId = reqData;
  try {
    const product = await api.get(`/api/products/product/${productId}`);
    dispatch(findProductByIdSuccess(product));
  } catch (error) {
    dispatch(findProductByIdFailure(error.message));
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
export const getProducts = (reqData) => async (dispatch) => {
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
  } = reqData;

  try {
    const pageData = await api.get(
      `/api/products?category=${category}&carmake=${carMake}&minPrice=${minPrice}&maxPrice=${maxPrice}&
      minDiscount=${minDiscount}&sort=${sort}&stock=${stock}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    dispatch(getProductsSuccess(pageData));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};
