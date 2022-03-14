import { apiUrl } from "../../config/constants";
import axios from "axios";
import { showMessageWithTimeout } from "../appState/actions";

export function levelPlayerById(id) {
  return {
    type: "PLAYERS/playerById",
    payload: id,
  };
}

export function levelPlayerByID(id, levelId) {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();
      const id = user.id;
      console.log("What is this id", id);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${apiUrl}/levels/update/${id}/${levelId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response from thunk", response.data);
      //   console.log("Am I getting here?", response);
      const levelUpdate = response.data;
      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(levelPlayerById(levelUpdate));

      dispatch(
        showMessageWithTimeout(
          "success",
          true,
          "Your level was successfuly updated!!!"
        )
      );
    } catch (e) {}
  };
}
