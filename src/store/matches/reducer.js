// src/store/artow/reducer.js
const initialState = {
  matches: [],
  matchesPlayed: [],
  matchesPlayedPicture: [],
  sets: [],
};

export default function reducer(state = initialState, action) {
  // console.log("home reducer reveived", action);
  switch (action.type) {
    case "MATCHES/allMatchesFetched": {
      // console.log("MATCHES/allMatchesFetched from the reducer", action.payload);
      return {
        ...state,
        matches: action.payload,
      };
    }
    case "MATCHES/findMatchId": {
      // console.log("MATCHES/findMatchId from the reducer", action.payload);
      return {
        ...state,
        matchesPlayed: action.payload,
      };
    }

    case "MATCHES/getPlayersTroughMatchId":
      // console.log(
      //   "MATCHES/getPlayersTroughMatchId from the reducer",
      //   action.payload
      // );
      return {
        ...state,
        matchesPlayedPicture: action.payload,
      };
    case "MATCHES/getSetsMatchId": {
      console.log("MATCHES/getSetsMatchId from the reducer", action.payload);
      return {
        ...state,
        sets: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
