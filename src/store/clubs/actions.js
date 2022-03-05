import axios from "axios";
// import { showMessageWithTimeout } from "../appState/actions";
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
      //   dispatch();
      const response = await axios.get(`${apiUrl}/clubs`);
      //   console.log("response from thunk", response.data);
      const clubs = response.data.clubs;
      //(ASK TO EXPLAIN WHY BECAME [] IF YOU REMOVE THE artworkAndBids FROM DATA )
      //if is undefined get the first item like artworkAndBids but remmber to do the reducer as well
      // const its_The_Same_name_1 = response.data.getAllSpaces;
      // console.log("it is the same name 1", its_The_Same_name_1);
      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(clubsFullyFetched(clubs));
    } catch (e) {}
  };
}
