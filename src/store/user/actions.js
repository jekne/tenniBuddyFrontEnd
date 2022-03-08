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

// const displayLevelLocation = (data) => {
//   return {
//     type: "USER/displayLevelLocation",
//     payload: data,
//   };
// };

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
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
      //   dispatch();
      const response = await axios.get(`${apiUrl}/users`);
      //   console.log("response from thunk", response.data);
      const users = response.data;
      //(ASK TO EXPLAIN WHY BECAME [] IF YOU REMOVE THE artworkAndBids FROM DATA )
      //if is undefined get the first item like artworkAndBids but remmber to do the reducer as well
      // const its_The_Same_name_1 = response.data.getAllSpaces;
      // console.log("it is the same name 1", its_The_Same_name_1);
      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(displayPlayers(users));
    } catch (e) {}
  };
}
export function fetchAllLevels() {
  return async function thunk(dispatch, getState) {
    try {
      //   dispatch();
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

  telephone,
  password,
}) {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();
      const id = user.id;
      const token = localStorage.getItem("token");
      // console.log(
      //   `THIS IS MY USER GETSTATE ${user}, and my id from thunk ${id}`
      // );
      console.log("name age dessciption", name, age, description);
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

          telephone,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("response from thunk", response.data);
      console.log("Am I getting here?", response);
      // console.log("My token", token);

      dispatch(userToUpdate(response.data));
      window.location.reload();
    } catch (e) {}
  };
}

//FETCH THE MATCHE BY ID
export function fetchMatchById() {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();
      // console.log("i am here?", user);
      const userId = user.id;
      //   dispatch();
      const response = await axios.get(`${apiUrl}/users/${userId}`);
      // console.log("response from thunk", response.data);
      const matches = response.data;

      dispatch(displayMatches(matches));
    } catch (e) {}
  };
}

//TEST WITH TWO ENDPOINTS LOCATION AND LEVEL
// export function fetchLocationLevel() {
//   return async function thunk(dispatch, getState) {
//     console.log("I am getting here!!!!");
//     // dispatch(startLoadingPost());

//     const [levelResponse, locationResponse] = await Promise.all([
//       axios.get(`${apiUrl}/users`),
//       axios.get(`${apiUrl}/users/location`),
//     ]);

//     dispatch(
//       displayLevelLocation({
//         level: levelResponse.data,
//         location: locationResponse.data.usersLocation,
//       })
//     );
//   };
// }
