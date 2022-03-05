import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };
    case "USER/displayPlayers": {
      // console.log("USER/displayPlayers from the reducer", action.payload);
      return { ...state, ...action.payload };
    }
    case "USER/displayLevels": {
      console.log("USER/displayLevels from the reducer", action.payload);
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
};
