import axios from "axios";
import { apiUrl } from "../../config/constants";

export function newStory(content) {
  return {
    type: "STORIES/newStory",
    payload: content,
  };
}

export function createNewStory({ content, token, id }) {
  return async function thunk(dispatch, getState) {
    try {
      // const { user } = getState();
      // const userId = user.id;
      // console.log(
      //   `THIS IS MY USER GETSTATE ${user}, and my spaceId from thiunk ${userId}`
      // );
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
      const { user } = getState();
      // const userId = user.id;

      // console.log("user id from the thunk", userId);
      const response = await axios.get(
        `${apiUrl}/stories/stories/${id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //   console.log("My token", token);
      //   console.log("response from thunk", response);
      const story = response.data;
      console.log("story from the thunk", story.stories);

      dispatch(showStories(response.data.stories));
    } catch (e) {}
  };
}
