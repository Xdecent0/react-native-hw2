import {
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { useState,} from "react";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function Login({ navigation }) {
  const [state, setState] = useState(initialState);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLogin = () => {
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  const keyboardClose = () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/img/RegBG.jpg")}
          style={{
            ...styles.image,
            marginBottom: Platform.OS == "android" && keyboardShown ? -240 : 0,
          }}
        >
          <View
            style={{
              ...styles.screen,
              marginBottom: Platform.OS == "android" && keyboardShown ? 240 : 0,
            }}
          >
            <View
              style={{
                ...styles.form,
                marginBottom:
                  Platform.OS == "android" && keyboardShown ? -230 : 0,
              }}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" && "padding"}
              >
                <Text style={styles.heading}>Увійти</Text>

                <View>
                  <TextInput
                    placeholder="Адреса електронної пошти"
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                    style={styles.input}
                    onFocus={() => setKeyboardShown(true)}
                  />
                </View>
                <View
                  style={{
                    marginTop: 16,
                    marginBottom:
                      Platform.OS == "ios" && keyboardShown ? 100 : 0,
                  }}
                >
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Пароль"
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    style={styles.input}
                    onFocus={() => setKeyboardShown(true)}
                  />
                </View>
              </KeyboardAvoidingView>
              <TouchableOpacity onPress={onLogin} style={styles.button}>
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>
              <Text style={styles.cta}>
                Немає акаунту?{" "}
                <Text onPress={() => navigation.navigate("Registration")}>
                  Зареєструватися
                </Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  thumb: {
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: 33,
    paddingTop: 33,
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "RobotoMedium",
  },
  input: {
    marginHorizontal: 16,
    height: 50,
    borderWidth: 1,
    paddingLeft: 16,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontFamily: "RobotoRegular",
  },
  button: {
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "RobotoRegular",
  },
  cta: {
    textAlign: "center",
    marginBottom: 143,
    fontFamily: "RobotoRegular",
  },
});
