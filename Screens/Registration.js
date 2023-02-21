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
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { authSignUpUser } from "../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
  nickname: "",
};

export default function Registration({ navigation }) {
  const [state, setState] = useState(initialState);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(authSignUpUser(state));
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
                  Platform.OS == "android" && keyboardShown ? -170 : 0,
              }}
            >
              <View style={styles.avatar}>
                <Image
                  style={styles.addBtn}
                  source={require("../assets/img/add.jpg")}
                />
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" && "padding"}
              >
                <Text style={styles.heading}>Реєстрація</Text>

                <View>
                  <TextInput
                    placeholder="Логін"
                    value={state.nickname}
                    style={styles.input}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        nickname: value,
                      }))
                    }
                    onFocus={() => setKeyboardShown(true)}
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    placeholder="Адреса електронної пошти"
                    value={state.email}
                    style={styles.input}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                    onFocus={() => setKeyboardShown(true)}
                  />
                </View>
                <View
                  style={{
                    marginTop: 16,
                    marginBottom:
                      Platform.OS == "ios" && keyboardShown ? 150 : 0,
                  }}
                >
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Пароль"
                    value={state.password}
                    style={styles.input}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    onFocus={() => setKeyboardShown(true)}
                  />
                </View>
              </KeyboardAvoidingView>
              <TouchableOpacity onPress={onLogin} style={styles.button}>
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>
              <Text style={styles.cta}>
                Вже є акаунт?{" "}
                <Text onPress={() => navigation.navigate("Login")}>Увійти</Text>
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
    alignItems: "center",
  },
  thumb: {
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: 33,
    marginTop: 32,
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "RobotoMedium",
  },
  input: {
    marginHorizontal: 16,
    minWidth: 343,
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
    minWidth: 343,
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
    marginBottom: 78,
    fontFamily: "RobotoRegular",
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginTop: -60,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  addBtn: {
    marginRight: -12,
    marginBottom: 14,
  },
});
