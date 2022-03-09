// src/store/artow/reducer.js
const initialState = {
  matches: [],
};

export default function reducer(state = initialState, action) {
  // console.log("home reducer reveived", action);
  switch (action.type) {
    case "MATCHES/allMatchesFetched": {
      console.log("MATCHES/allMatchesFetched from the reducer", action.payload);
      return {
        ...state,
        matches: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
