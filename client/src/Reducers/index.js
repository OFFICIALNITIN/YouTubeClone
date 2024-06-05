import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import channelReducers from "./channel";
import videoReducer from "./Video";
import likedVideoReducer from "./likedVideo";
import watchLaterReducers from "./watchLater";
import HistoryReducer from "./history";
import commentReducer from "./comment";

const rootReducer = combineReducers({
  authReducer,
  currentUserReducer,
  channelReducers,
  videoReducer,
  likedVideoReducer,
  watchLaterReducers,
  HistoryReducer,
  commentReducer,
});

export default rootReducer;
