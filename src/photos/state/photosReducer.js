import initialState from "../../state/reducers/initialState";
import * as types from "./actionTypes";

export default function photosReducer(state = initialState.photos, action) {
  switch (action.type) {
    case types.GET_RECENT_PHOTOS:
      return action.payload;
    case types.GET_SEARCHED_PHOTOS: {
      console.log(action.type);
      return action.payload;
    }
    default:
      return state;
  }
}
