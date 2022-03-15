const initialState = {
  chats: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "CHATS/selectAllChats": {
      //   console.log("CHATS/selectAllChats from the reducer", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }
    case "CHATS/chatsById": {
      console.log("CHATS/chatsById from the reducer", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }
    case "CHATS/Receiver": {
      console.log("CHATS/Receiver from the reducer", action.payload);
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
