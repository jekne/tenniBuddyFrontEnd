import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

const displayPlayers = (data) => {
  return {
    type: "USER/displayPlayers",
    payload: data,
  };
};
const displayLevels = (data) => {
  return {
    type: "USER/displayLevels",
    payload: data,
  };
};

export function playerById(id) {
  return {
    type: "USER/playerById",
    payload: id,
  };
}
export function userToUpdate(data) {
  return {
    type: "USERS/userToUpdate",
    payload: data,
  };
}
export const logOut = () => ({ type: LOG_OUT });

export const signUp = (
  name,
  age,
  description,
  email,
  gender,
  imageUrl,
  location,
  telephone,
  password
) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    console.log(name, email, password);

    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        age,
        description,
        email,
        gender,
        imageUrl,
        telephone,
        location,
        password,
      });
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
      } else {
      }

      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export function fetchAllPlayers() {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/users`);

      const users = response.data.users;

      dispatch(displayPlayers(users));
    } catch (e) {}
  };
}

export function fetchAllLevels() {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/levels`);

      const levels = response.data;

      dispatch(displayLevels(levels));
    } catch (e) {}
  };
}

export function usersWillBeUpdate({
  name,
  age,
  description,
  email,
  gender,
  imageUrl,
  location,
  telephone,
  password,
}) {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();
      const id = user.id;
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${apiUrl}/users/update/${id}`,
        {
          name,
          age,
          description,
          email,
          gender,
          imageUrl,
          location,
          telephone,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(userToUpdate(response.data));
      window.location.reload();
    } catch (e) {}
  };
}

export function ShowPlayerByID(id) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/users/details/${id}`);

      const showPlayer = response.data.users;

      dispatch(playerById(showPlayer));
    } catch (e) {}
  };
}
