import { api } from "../../config/apiConfig";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
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

const createProductRequest = () => ({ type: CREATE_PRODUCT_REQUEST });
const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product,
});
const createProductsFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

export const createProduct = (productData) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    const response = await api.post(`api/admin/products`, productData);
    dispatch(createProductSuccess(response.data));
    console.log("Created Product:", response.data);
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(createProductsFailure(errorMsg));
  }
};

const deleteProductByIdRequest = () => ({ type: DELETE_PRODUCT_BY_ID_REQUEST });
const deleteProductByIdSuccess = (productId) => ({
  type: DELETE_PRODUCT_BY_ID_SUCCESS,
  payload: productId,
});
const deleteProductByIdFailure = (error) => ({
  type: DELETE_PRODUCT_BY_ID_FAILURE,
  payload: error,
});

export const deleteProductByID = (productId) => async (dispatch) => {
  dispatch(deleteProductByIdRequest());
  try {
    const response = await api.delete(`api/admin/products/${productId}`);
    dispatch(deleteProductByIdSuccess(productId));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.messag;
    dispatch(deleteProductByIdFailure(errorMsg));
  }
};
