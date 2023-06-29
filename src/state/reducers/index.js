import { combineReducers } from "redux";
import photos from "../../photos/state/photosReducer";

const rootReducer = combineReducers({
  photos,
});

export default rootReducer;
