import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  userData: null,
  email: null,
  authToken: null,
  isAuthenticated: false,
  authLoading: true,
};
const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
