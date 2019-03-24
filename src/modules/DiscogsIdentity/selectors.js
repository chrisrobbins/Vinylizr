/**
 * Import node modules
 */
import { createSelector } from "reselect";

/**
 * Select the correct portion of  root reducer
 */
const selectDiscogsIdentityReducer = () => state => state.get("userProfile");

/**
 * select user discogs identity from state
 */
export const getDiscogsIdentity = () =>
  createSelector(
    selectDiscogsIdentityReducer(),
    state => state.get("data").toJS()
  );

/**
 * select isFetching from state
 */
export const getIsFetching = () =>
  createSelector(
    selectDiscogsIdentityReducer(),
    state => state.get("isFetching")
  );
