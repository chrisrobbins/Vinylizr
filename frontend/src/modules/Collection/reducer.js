/**
 *  Import action creator constants
 */
import { UPDATE_IS_FETCHING, FETCH_USER_COLLECTION } from './constants';

/**
 *  Set intial state
 */
const initialState = {
  releases: [],
  isFetching: false,
};

/**
 *  Define the reducer with actions
 */
function userCollection(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_COLLECTION:
      const { payload } = action;
      const vinylData = payload.reduce((arrangedData, data) => {
        // c[0] should be the first letter of an entry
        let record = data.basic_information.artists[0].name[0].toLocaleUpperCase();

        // either push to an existing dict entry or create one
        if (arrangedData[record]) arrangedData[record].push(data);
        else arrangedData[record] = [data];

        return arrangedData;
      }, {});

      const collectionSections = Object.entries(vinylData).map(vinyl => {
        return {
          title: vinyl[0],
          data: vinyl[1],
          sectionId: Math.random()
            .toString(36)
            .slice(2),
        };
      });
      return {
        ...state,
        releases: state.releases.concat(collectionSections),
      };
    case UPDATE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.status,
      };
    default:
      return state;
  }
}

/**
 *  Export the reducer
 */
export default userCollection;
