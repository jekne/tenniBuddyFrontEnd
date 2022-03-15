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
      return { ...state, players: [...action.payload] };
    }
    case "USER/displayLevels": {
      return { ...state, ...action.payload };
    }
    case "USERS/userToUpdate": {
      console.log("action user", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }
    case "USER/displayMatches": {
      return {
        ...state,
        match: action.payload.userById,
      };
    }
    case "USER/displayLevelLocation": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "USER/playerById": {
      return {
        ...state,
        playerById: { ...action.payload },
      };
    }
    case "USER/displayWinner": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
