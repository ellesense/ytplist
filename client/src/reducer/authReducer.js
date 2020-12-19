const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        ...action.payload,
      };
    case "REGISTER_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        ...action.payload,
      };
    case "LOGIN_SUCCESS":
      return 1;
    case "LOGIN_FAIL":
      return 1;
    default:
      return initState;
  }
};
