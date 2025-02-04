import axios from "axios";
import { api, API_BASE_URL } from "../../config/apiConfig";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./actionType";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (jwt) => ({ type: REGISTER_SUCCESS, payload: jwt });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

const saveJwtToLocalStorage = (jwt) => {
  localStorage.setItem("jwt", jwt);
};

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axiosInstance.post(`/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      saveJwtToLocalStorage(user.jwt);
      dispatch(registerSuccess(user.jwt));
    }
    console.log("user:", user);
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(registerFailure(errorMsg));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (jwt) => ({ type: LOGIN_SUCCESS, payload: jwt });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axiosInstance.post(`/auth/login`, userData);
    const user = response.data;
    if (user.jwt) {
      saveJwtToLocalStorage(user.jwt);
      dispatch(loginSuccess(user.jwt));
    }
    console.log("user:", user);
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(loginFailure(errorMsg));
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUserProfile = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axiosInstance.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    console.log("user:", user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch(getUserFailure(errorMsg));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();

  // Remove Authorization header
  delete api.defaults.headers.common["Authorization"];
};
