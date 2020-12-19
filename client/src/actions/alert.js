import { v4 } from "uuid";

// alertType: 'warning', 'success'
export const setAlert = (msg, alertType) => (dispatch) => {
  console.log("From action/alert.js: ", msg);
  const id = v4();
  dispatch({
    id,
    type: "ADD_ALERT",
    payload: { id, alertType, msg },
  });

  setTimeout(() => {
    dispatch({ type: "REMOVE_ALERT", payload: id });
  }, 3000);
};
