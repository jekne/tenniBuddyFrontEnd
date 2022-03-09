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
