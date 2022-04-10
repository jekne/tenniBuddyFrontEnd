import axios from "axios";

import { apiUrl } from "../../config/constants";

export function clubsFullyFetched(data) {
  return {
    type: "CLUBS/allClubsFetched",
    payload: data,
  };
}

export function fetchClubs() {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/clubs`);

      const clubs = response.data.clubs;

      dispatch(clubsFullyFetched(clubs));
    } catch (e) {}
  };
}
