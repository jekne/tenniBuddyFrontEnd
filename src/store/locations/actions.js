import { apiUrl } from "../../config/constants";
import axios from "axios";

export function allLocations(data) {
  return {
    type: "LOCATIONS/selectAllLocations",
    payload: data,
  };
}

export function fetchAllLocations() {
  return async function thunk(dispatch, getState) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${apiUrl}/locations`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response from thunk", response.data);

      const locations = response.data;

      dispatch(allLocations(locations));
    } catch (e) {}
  };
}
