import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";

import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Entered email or password are incorrect!");
    }
  };

export const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, { displayName: nickname });

      const { displayName, uid } = auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
          email,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authStateChanged = () => async (dispatch) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        email: user.email,
        nickname: user.displayName,
        userId: user.uid,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);

  dispatch(authSlice.actions.authSignOut());
};
