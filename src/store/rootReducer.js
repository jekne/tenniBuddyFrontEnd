import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import club from "./clubs/reducer";
import players from "./players/reducer";
import stories from "./stories/reducer";
import locations from "./locations/reducer";

export default combineReducers({
  appState,
  user,
  club,
  players,
  stories,
  locations,
});
