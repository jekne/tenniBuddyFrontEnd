import axios from "axios";
import { apiUrl } from "../../config/constants";
import { showMessageWithTimeout } from "../appState/actions";

export function newStory(content) {
  return {
    type: "STORIES/newStory",
    payload: content,
  };
}

export function createNewStory({ content, token, id }) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.post(
        `${apiUrl}/stories/${id}`,
        {
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("My token", token);
      console.log("response from thunk", response);

      dispatch(newStory(response.data));
      dispatch(fetchStories(id, token));
      dispatch(
        showMessageWithTimeout("success", false, "Message sent to the BUDDY!")
      );
    } catch (e) {}
  };
}

export function showStories(data) {
  return {
    type: "STORIES/showStories",
    payload: data,
  };
}

export function fetchStories(id, token) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(
        `${apiUrl}/stories/stories/${id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(showStories(response.data.stories));
    } catch (e) {}
  };
}
