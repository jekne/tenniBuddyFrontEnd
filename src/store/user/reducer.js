import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  players: [],
  playerById: {},
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
      return { ...state, players: [...action.payload] };
    }
    case "USER/displayLevels": {
      // console.log("USER/displayLevels from the reducer", action.payload);
      return { ...state, ...action.payload };
    }
    case "USERS/userToUpdate": {
      // console.log("action payload USERS/userToUpdate", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }
    case "USER/displayMatches": {
      // console.log("USER/displayMatches from the reducer", action.payload);

      return {
        ...state,
        match: action.payload.userById,
      };
    }
    case "USER/displayLevelLocation": {
      // console.log("USER/displayLevelLocation from the reducer", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }
    case "USER/playerById": {
      // console.log("USER/playerByIdlLocation from the reducer", action.payload);
      return {
        ...state,
        playerById: { ...action.payload },
      };
    }
    case "USER/displayWinner": {
      // console.log("USER/displayWinner from the reducer", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
