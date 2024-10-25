import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
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

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (jwt) => ({ type: REGISTER_SUCCESS, payload: jwt });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest);
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch(registerSuccess(user.jwt));
    }
    console.log("user:", user);
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (jwt) => ({ type: LOGIN_SUCCESS, payload: jwt });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest);
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch(loginSuccess(user.jwt));
    }
    console.log("user:", user);
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (jwt) => ({ type: GET_USER_SUCCESS, payload: jwt });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUserProfile = (jwt) => async (dispatch) => {
  dispatch(getUserRequest);
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    console.log("user:", user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};
