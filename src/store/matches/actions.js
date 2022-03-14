import axios from "axios";
import { apiUrl } from "../../config/constants";

export function clubsFullyFetched(data) {
  return {
    type: "MATCHES/allMatchesFetched",
    payload: data,
  };
}

export function findMatchId(data) {
  return {
    type: "MATCHES/findMatchId",
    payload: data,
  };
}

export function getPlayersTroughMatchId(data) {
  return {
    type: "MATCHES/getPlayersTroughMatchId",
    payload: data,
  };
}

export function getSetsMatchId(data) {
  return {
    type: "MATCHES/getSetsMatchId",
    payload: data,
  };
}

//FETCH ALL MATCHES
export function fetchAllMatches() {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/usermatches/all`);

      const getMatches = response.data.AllMatches;

      dispatch(clubsFullyFetched(getMatches));
    } catch (e) {}
  };
}

//GET THE MATCH ID FROM THE USERSMATCH
export function getMatcheId() {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();
      const id = user.id;

      const response = await axios.get(`${apiUrl}/usermatches/new/${id}`);

      const theMatchId = response.data;

      dispatch(findMatchId(theMatchId));
    } catch (e) {}
  };
}

//FETCH THE USERS WHO PLAYED THAT MATCH
export function fetchPlayersWhoPlayed(matchesPlayed) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(
        `${apiUrl}/usermatches/${matchesPlayed}`
      );

      const playersWithPicture = response.data;

      dispatch(getPlayersTroughMatchId(playersWithPicture));
    } catch (e) {}
  };
}

//FETCH THE SETS IN THE SPCIFIC MATCH
export function fetchSets(matchesPlayed) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/sets/${matchesPlayed}`);
      console.log("response from thunk !!!!!!!", response.data.SetByMatchId);
      const sets = response.data;

      dispatch(getSetsMatchId(sets));
    } catch (e) {}
  };
}
