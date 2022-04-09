const initialState = {
  clubs: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "CLUBS/allClubsFetched": {
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
