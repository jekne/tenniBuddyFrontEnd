const initialState = {
  matches: [],
  matchesPlayed: [],
  matchesPlayedPicture: [],
  sets: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "MATCHES/allMatchesFetched": {
      return {
        ...state,
        matches: action.payload,
      };
    }
    case "MATCHES/findMatchId": {
      return {
        ...state,
        matchesPlayed: action.payload,
      };
    }

    case "MATCHES/getPlayersTroughMatchId":
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
