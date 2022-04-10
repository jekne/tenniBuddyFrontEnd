const initialState = {
  players: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "PLAYERS/playerById": {
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
