import { apiUrl } from "../../config/constants";
import axios from "axios";

export function allLChats(data) {
  return {
    type: "CHATS/selectAllChats",
    payload: data,
  };
}

export function chatsById(data) {
  return {
    type: "CHATS/chatsById",
    payload: data,
  };
}

export function chatsByIdReceiver(data) {
  return {
    type: "CHATS/Receiver",
    payload: data,
  };
}

export function fetchAllChats() {
  return async function thunk(dispatch, getState) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${apiUrl}/chats`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response from thunk", response.data);

      const chats = response.data;

      dispatch(allLChats(chats));
    } catch (e) {}
  };
}

//SENDER
export function fetchChatsById(id) {
  return async function thunk(dispatch, getState) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${apiUrl}/chats/sender/${id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response from thunk", response.data);

      const chatsById = response.data;

      dispatch(chatsById(chatsById));
    } catch (e) {}
  };
}

//RECEIVER
export function fetchChatsByIdReceiver(id) {
  return async function thunk(dispatch, getState) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${apiUrl}/chats/receiver/${id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response from thunk", response.data);

      const chatsByIdReceiver = response.data;

      dispatch(chatsByIdReceiver(chatsByIdReceiver));
    } catch (e) {}
  };
}
