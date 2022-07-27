import axios from "axios";
import { ENDPOINT } from "contants/api";
import useGlobalState from "Hooks/useGlobalState";
import { createStore } from "react-hooks-global-state";
import { useEffect } from "react";
import { AuthReducer } from "ReducerGlobal/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { setAUTH } from "page/authSlice";

const useAuthUser = () => {
  const authState = useSelector((state) => state.authLogin);
  const { updateUser, isAuthenticated, user } = authState;
  const dispatch = useDispatch();

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const loadUser = async () => {
    if (localStorage["auth_token"]) {
      setAuthToken(localStorage["auth_token"]);
    }
    try {
      const res = await axios.get(`${ENDPOINT}/account`);
      if (res.data.success) {
        dispatch(
          setAUTH({
            isAuthenticated: true,
            user: res.data.user,
          })
        );
      }
    } catch (error) {
      localStorage.removeItem("auth_token");
      setAuthToken(null);
      dispatch(
        setAUTH({
          isAuthenticated: false,
          user: null,
        })
      );
    }
  };

  useEffect(() => {
    loadUser();
  }, [isAuthenticated, updateUser]);

  return { isAuthenticated, user };
};

export default useAuthUser;
