import axios from "axios";
import { apiUrl } from "../../config/constants";

export function clubsFullyFetched(data) {
  return {
    type: "MATCHES/allMatchesFetched",
    payload: data,
  };
}

export function fetchAllMatches() {
  return async function thunk(dispatch, getState) {
    try {
      //   dispatch();
      const response = await axios.get(`${apiUrl}/usermatches/all`);
      //   console.log("response from thunk", response.data);
      const getMatches = response.data.AllMatches;

      dispatch(clubsFullyFetched(getMatches));
    } catch (e) {}
  };
}

export function findMatchId(data) {
  return {
    type: "MATCHES/findMatchId",
    payload: data,
  };
}

//GET THE MATCH ID FROM THE USERSMATCH
export function getMatcheId() {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();
      const id = user.id;
      // console.log("id from the thunk", id);
      //   dispatch();
      const response = await axios.get(`${apiUrl}/usermatches/new/${id}`);
      // console.log(
      //   "response from thunk",
      //   response.data.findThematchesPlayed.matchId
      // );
      const theMatchId = response.data;

      dispatch(findMatchId(theMatchId));
    } catch (e) {}
  };
}

export function getPlayersTroughMatchId(data) {
  return {
    type: "MATCHES/getPlayersTroughMatchId",
    payload: data,
  };
}
//FETCH THE USERS WHO PLAYED THAT MATCH
export function fetchPlayersWhoPlayed(test) {
  return async function thunk(dispatch, getState) {
    try {
      // const { user } = getState();
      // // console.log("i am here?", user);
      // const userId = user.id;
      //   dispatch();
      const response = await axios.get(`${apiUrl}/usermatches/${test}`);
      // console.log("response from thunk !!!!!!!", response.data);
      const playersWithPicture = response.data;

      dispatch(getPlayersTroughMatchId(playersWithPicture));
    } catch (e) {}
  };
}
