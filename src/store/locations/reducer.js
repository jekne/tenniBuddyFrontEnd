const initialState = {
  locations: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOCATIONS/selectAllLocations": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
