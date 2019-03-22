import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import createDebounce from "redux-debounced";
import DISCOGS_BASE_URL from "./routes";
import reducers from "./reducers";
import axios from "axios";

const client = axios.create({
  baseURL: `${DISCOGS_BASE_URL}`,
  responseType: "json"
});

/**
 * Prepare the Redux Store
 */
const composedMiddlewares = applyMiddleware(createDebounce(), thunkMiddleware);

const storeEnhancers = composeWithDevTools({
  name: "Vinylizr"
})(composedMiddlewares);

const makeStore = () => {
  return createStore(reducers, undefined, storeEnhancers);
};

export default makeStore;
