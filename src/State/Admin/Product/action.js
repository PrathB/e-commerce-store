import { api } from "../../../config/apiConfig";
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
  GET_NON_FEATURED_PRODUCTS_REQUEST,
  GET_NON_FEATURED_PRODUCTS_SUCCESS,
  REMOVE_PRODUCT_FROM_FEATURED_FAILURE,
  REMOVE_PRODUCT_FROM_FEATURED_REQUEST,
  REMOVE_PRODUCT_FROM_FEATURED_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./actionType";

const getAllProductsRequest = () => ({ type: GET_ALL_PRODUCTS_REQUEST });
const getAllProductsSuccess = (productArr) => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: productArr,
});
const getAllProductsFailure = (error) => ({
  type: GET_ALL_PRODUCTS_FAILURE,
  payload: error,
});

export const getAllProducts = () => async (dispatch) => {
  dispatch(getAllProductsRequest());
  try {
    const response = await api.get("api/admin/products");
    dispatch(getAllProductsSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(getAllProductsFailure(errorMsg));
  }
};

const getNonFeaturedProductsRequest = () => ({
  type: GET_NON_FEATURED_PRODUCTS_REQUEST,
});
const getNonFeaturedProductsSuccess = (productArr) => ({
  type: GET_NON_FEATURED_PRODUCTS_SUCCESS,
  payload: productArr,
});
const getNonFeaturedProductsFailure = (error) => ({
  type: GET_NON_FEATURED_PRODUCTS_FAILURE,
  payload: error,
});

export const getNonFeaturedProducts = () => async (dispatch) => {
  dispatch(getNonFeaturedProductsRequest());
  try {
    const response = await api.get("api/admin/products/non-featured");
    dispatch(getNonFeaturedProductsSuccess(response.data));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(getNonFeaturedProductsFailure(errorMsg));
  }
};

const createProductRequest = () => ({ type: CREATE_PRODUCT_REQUEST });
const createProductSuccess = (productId) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: productId,
});
const createProductsFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

export const createProduct = (productData) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    const response = await api.post(`api/admin/products`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch(createProductSuccess(response.data._id));
    console.log("Created Product:", response.data);
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(createProductsFailure(errorMsg));
  }
};

const updateProductRequest = () => ({ type: UPDATE_PRODUCT_REQUEST });
const updateProductSuccess = (productId) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: productId,
});
const updateProductsFailure = (error) => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProduct = (productId, productData) => async (dispatch) => {
  dispatch(updateProductRequest());
  try {
    const response = await api.put(
      `api/admin/products/${productId}`,
      productData
    );
    dispatch(updateProductSuccess(response.data._id));
    console.log("Updated Product:", response.data._id);
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(updateProductsFailure(errorMsg));
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
    await api.delete(`api/admin/products/${productId}`);
    dispatch(deleteProductByIdSuccess(productId));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.messag;
    dispatch(deleteProductByIdFailure(errorMsg));
  }
};

const addProductsToFeaturedRequest = () => ({
  type: ADD_PRODUCTS_TO_FEATURED_REQUEST,
});
const addProductsToFeaturedSuccess = (productId) => ({
  type: ADD_PRODUCTS_TO_FEATURED_SUCCESS,
  payload: productId,
});
const addProductsToFeaturedFailure = (error) => ({
  type: ADD_PRODUCTS_TO_FEATURED_FAILURE,
  payload: error,
});

export const addProductsToFeatured = (selectedProducts) => async (dispatch) => {
  dispatch(addProductsToFeaturedRequest());
  try {
    await api.post(
      `api/admin/products/featured/add-multiple`,
      { productIds: selectedProducts },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch(addProductsToFeaturedSuccess(selectedProducts));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(addProductsToFeaturedFailure(errorMsg));
  }
};

const removeProductFromFeaturedRequest = () => ({
  type: REMOVE_PRODUCT_FROM_FEATURED_REQUEST,
});
const removeProductFromFeaturedSuccess = (productId) => ({
  type: REMOVE_PRODUCT_FROM_FEATURED_SUCCESS,
  payload: productId,
});
const removeProductFromFeaturedFailure = (error) => ({
  type: REMOVE_PRODUCT_FROM_FEATURED_FAILURE,
  payload: error,
});

export const removeProductfromFeatured = (productId) => async (dispatch) => {
  dispatch(removeProductFromFeaturedRequest());
  try {
    await api.delete(`api/admin/products/featured/${productId}`);
    dispatch(removeProductFromFeaturedSuccess(productId));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(removeProductFromFeaturedFailure(errorMsg));
  }
};
