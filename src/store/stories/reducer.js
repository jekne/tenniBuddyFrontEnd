const initialState = {
  stories: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "STORIES/newStory": {
      return {
        ...state,
      };
    }
    case "STORIES/showStories": {
      return {
        ...state,
        stories: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
