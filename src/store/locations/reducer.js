const initialState = {
  locations: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOCATIONS/selectAllLocations": {
      console.log(
        "LOCATIONS/selectAllLocations from the reducer",
        action.payload
      );
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
