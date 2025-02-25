import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Authorization/reducer";
import { customerProductReducer } from "./Product/reducer";
import { cartReducer } from "./Cart/reducer";
import { orderReducer } from "./Order/reducer";
import { adminOrderReducer } from "./Admin/Order/reducer";
import { adminProductReducer } from "./Admin/Product/reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  adminProduct: adminProductReducer,
  cart: cartReducer,
  order: orderReducer,
  adminOrder: adminOrderReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
