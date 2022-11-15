import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

import { cartReducer } from "./cart/cart.reducer";

// const createComposer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export const store = legacy_createStore(
  combineReducers({ cart: cartReducer }),
  compose(applyMiddleware(thunk))
);
