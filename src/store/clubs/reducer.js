// src/store/artow/reducer.js
const initialState = {
  clubs: [],
};

export default function reducer(state = initialState, action) {
  // console.log("home reducer reveived", action);
  switch (action.type) {
    case "CLUBS/allClubsFetched": {
      console.log("CLUBS/allClubsFetched from the reducer", action.payload);
      return {
        ...state,
        clubs: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
