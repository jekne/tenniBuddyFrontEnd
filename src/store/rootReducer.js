import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import club from "./clubs/reducer";
import matches from "./matches/reducer";
import players from "./players/reducer";
import stories from "./stories/reducer";

export default combineReducers({
  appState,
  user,
  club,
  matches,
  players,
  stories,
});
