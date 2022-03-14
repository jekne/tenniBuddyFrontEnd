// src/store/artow/reducer.js
const initialState = {
  stories: [],
  // playerById: [],
  // space: null,
};

export default function reducer(state = initialState, action) {
  // console.log("home reducer reveived", action);

  switch (action.type) {
    case "STORIES/newStory": {
      console.log("action user new Story", action.payload);

      return {
        // copy of the state
        ...state,
        // with a new value for space
        // space: {
        //   // copy of the space
        //   ...state.space,
        //   // the same stories but add the new one
        //   // stories: [...state.space.stories, action.payload],
        //   // stories: newStoriesCreated, //stories: [...space.stories, {new story}]
        // },
      };
    }
    case "STORIES/showStories": {
      console.log("STORIES/showStories from the reducer", action.payload);
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
