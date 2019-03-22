import { FETCH_DISCOGS_IDENTITY, UPDATE_IS_FETCHING } from "./constants";
import { fromJS } from "immutable";

const initialState = fromJS({
  data: {},
  isFetching: false
});

function DiscogsIdentityReducer(state = initialState, action) {
  console.log("USER ACTION", action, state);
  console.log("ACTION TYPE", action.type);

  switch (action.type) {
    case FETCH_DISCOGS_IDENTITY:
      return state.set("data", fromJS(action.profile));
    case UPDATE_IS_FETCHING:
      return state.set("isFetching", action.status);
    default:
      return state;
  }
}

export default DiscogsIdentityReducer;
