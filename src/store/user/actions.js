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

const displayMatches = (data) => {
  return {
    type: "USER/displayMatches",
    payload: data,
  };
};

const displayWinner = (data) => {
  return {
    type: "USER/displayWinner",
    payload: data,
  };
};

export function playerById(id) {
  return {
    type: "USER/playerById",
    payload: id,
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
    console.log("What it is my location", location);
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
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
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
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

//FETCH ALL THE PLAYERS
export function fetchAllPlayers() {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/users`);

      const users = response.data.users;

      dispatch(displayPlayers(users));
    } catch (e) {}
  };
}

//FETCH ALL LEVELS
export function fetchAllLevels() {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/levels`);

      const levels = response.data;

      dispatch(displayLevels(levels));
    } catch (e) {}
  };
}

//UPDATE THE USERS
export function userToUpdate(data) {
  return {
    type: "USERS/userToUpdate",
    payload: data,
  };
}

export function usersWillBeUpdate({
  name,
  age,
  description,
  email,
  gender,
  imageUrl,
  levelId,
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
          levelId,
          location,
          telephone,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(userToUpdate(response.data));
      console.log("response from backend", response.data);
      window.location.reload();
    } catch (e) {}
  };
}

//FETCH THE MATCHE BY ID
export function fetchMatchById() {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();

      const userId = user.id;

      const response = await axios.get(`${apiUrl}/users/${userId}`);

      const matches = response.data;

      dispatch(displayMatches(matches));
    } catch (e) {}
  };
}

//FETCH THE WINNER BY ID
export function fetchWinner() {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();
      const userId = user.id;

      const response = await axios.get(`${apiUrl}/matches/${userId}`);

      const winner = response.data;

      dispatch(displayWinner(winner));
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
