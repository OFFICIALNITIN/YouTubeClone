import * as api from "../api";

export const getUserPoints = (watchData) => async (dispatch) => {
  const { userId } = watchData;
  try {
    const { data } = await api.points(userId);
    dispatch({ type: "FETCH_USER_POINTS", payload: data.points });
  } catch (error) {
    console.error("Error fetching user points:", error);
  }
};
