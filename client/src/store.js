import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Corrected import
import rootReducer from "./Reducers";

// Enable Redux DevTools if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
