import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
  username: "",
};

export const Login = ({ navigation }) => {
  console.log("navigation", navigation);
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [fonts] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fonts) {
    return null;
  }
  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  const keyboardClose = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/img/RegBG.jpg")}
        >
          <View
            style={{
              ...styles.form,
              bottom: isShowKeyboard ? -170 : 0,
            }}
          >
            <Text style={styles.regText}>Войти</Text>
            <TextInput
              style={styles.input}
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              placeholder="Email"
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              placeholder="Password"
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Нет аккаунта?{" "}
                <Text onPress={() => navigation.navigate("Register")}>
                  Зарегистрироваться
                </Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#F6F6F6",
  },
  form: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  regText: {
    fontFamily: "RobotoMedium",
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    alignSelf: "center",
    marginBottom: 33,
    marginTop: 33,
  },
  button: {
    marginTop: 23,
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: "RobotoRegular",
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
    paddingBottom: 58,
  },
  footerText: {
    fontFamily: "RobotoRegular",
    color: "#1B4371",
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginTop: -60,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  addBtn: {
    marginRight: -12,
    marginBottom: 14,
  },
});
