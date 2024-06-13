import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const login = (authData) => async (dispatch) => {
  try {
    const res = await api.login(authData);
    console.log(res);
    const data = res.data;
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  } catch (error) {
    alert(error);
  }
};
