const videoReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "POST_VIDEO":
      return { ...state };
    case "POST_VIEWS":
      return { ...state };
    case "FETCH_ALL_VIDEOS":
      return { ...state, data: action.payload };
    case "WATCH_VIDEO":
      return { ...state };
    default:
      return state;
  }
};

export default videoReducer;
