export default function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: !state.loading };
    case "error":
      return { ...state, error: !state.error };
    case "authStatus":
      return { ...state, authStatus: !state.authStatus };
    case "token":
      return { ...state, token: action.payload };
    case "user":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
