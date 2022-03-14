const initialState = {
  players: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "PLAYERS/playerById": {
      console.log("PLAYERS/playerById from the reducer", action.payload);
      return {
        ...state,
        players: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
