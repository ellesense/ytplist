const initState = [
  // {id: 1, msg: 'hi i am an alert, alertType: 'error'}
];

export const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ALERT":
      return [...state, action.payload];
    case "REMOVE_ALERT":
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return initState;
  }
};
