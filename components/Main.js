import { useEffect } from "react";
import { useRoute } from "../route";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import { authStateChanged } from "../redux/auth/authOperations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const navigationRef = useNavigationContainerRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  const routing = useRoute(stateChange);

  return (
    <NavigationContainer ref={navigationRef}>{routing}</NavigationContainer>
  );
};

export default Main;
