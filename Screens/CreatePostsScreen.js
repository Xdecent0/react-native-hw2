import { useState, useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import { Camera } from "expo-camera";
import * as Location from "expo-location";

function CreatePost({ navigation }) {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [coords, setCoords] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [hasLocPremissions, setHasLocPremissions] = useState(false);
  const [photo, setPhoto] = useState(null);

  const cameraRef = useRef(null);

  const [fonts] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const nameInputHandler = (text) => setName(text);
  const locationInputHandler = (text) => setLocation(text);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const makePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        let location = await Location.getCurrentPositionAsync({});
        setCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setPhoto(photo.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const keyboardClose = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const sendPost = () => {
    navigation.navigate("Posts", { photo, name, location, coords });
    clearPost();
  };

  const clearPost = () => {
    setName("");
    setLocation("");
    setCoords("");
    setPhoto(null);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
            <Image source={require("../assets/img/arrow-left.jpg")} />
          </TouchableOpacity>

          <Text style={styles.title}>Создать публикацию</Text>
          <View
            style={{ width: 24, height: 24, backgroundColor: "transparent" }}
          />
        </View>
        <View style={styles.main}>
          {!photo && (
            <Camera style={styles.photoContainer} ref={cameraRef}>
              <TouchableOpacity
                style={styles.photoIcon}
                onPress={() => makePhoto()}
              >
                <Image source={require("../assets/img/camera.jpg")} />
              </TouchableOpacity>
            </Camera>
          )}

          {photo && (
            <Image source={{ uri: photo }} style={styles.photoContainer} />
          )}

          <View style={styles.credentials}>
            <KeyboardAvoidingView>
              {!photo && (
                <Text style={styles.credensTitle}>Загрузите фото</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Название..."
                  value={name}
                  onChangeText={nameInputHandler}
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={{ ...styles.inputContainer, marginTop: 16 }}>
                <Image
                  style={{ marginRight: 4 }}
                  source={require("../assets/img/map-pin.jpg")}
                />
                <TextInput
                  placeholder="Местность..."
                  value={location}
                  onChangeText={locationInputHandler}
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              {photo && name && location ? (
                <TouchableOpacity
                  style={styles.buttonActive}
                  onPress={sendPost}
                >
                  <Text style={styles.buttonTextActive}>Опублікувати</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.buttonInactive}>
                  <Text style={styles.buttonTextInactive}>Опублікувати</Text>
                </View>
              )}
            </KeyboardAvoidingView>
          </View>
        </View>
        <TouchableOpacity style={styles.delete} onPress={() => clearPost()}>
          <Image source={require("../assets/img/trash4.jpg")} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  header: {
    marginTop: 55,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: "RobotoMedium",
    marginBottom: 11,
  },
  main: {
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  photoContainer: {
    width: 343,
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: 16,
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  photoBtn: {
    height: 20,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "E8E8E8",
    borderRadius: 5,
  },
  credentials: {
    marginTop: 8,
  },
  credensTitle: {
    fontFamily: "RobotoRegular",
    color: "#BDBDBD",
    marginBottom: 32,
    marginLeft: 16,
    fontSize: 16,
  },
  inputContainer: {
    marginHorizontal: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 50,
    fontFamily: "RobotoMedium",
    fontSize: 16,
  },
  buttonInactive: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextInactive: {
    fontFamily: "RobotoRegular",
    color: "#BDBDBD",
    fontSize: 16,
  },
  buttonTextActive: {
    fontFamily: "RobotoRegular",
    color: "#fff",
    fontSize: 16,
  },
  delete: {
    marginBottom: 34,
    marginTop: 1,
    alignSelf: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePost;
