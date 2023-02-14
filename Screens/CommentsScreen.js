import { useState, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";

function Comment({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const { postId, photo } = route.params;

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const commentInputHandler = (text) => setComment(text);

  const keyboardClose = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
            <Image source={require("../assets/img/arrow-left.jpg")} />
          </TouchableOpacity>

          <Text style={styles.title}>Комментарии</Text>
          <View
            style={{ width: 24, height: 24, backgroundColor: "transparent" }}
          />
        </View>

        <View style={styles.main}>
          <Image source={{ uri: photo }} style={styles.imageContainer} />
        </View>
        <View style={styles.commentInput}>
          <TextInput
            placeholder="Комментировать..."
            value={comment}
            onChangeText={commentInputHandler}
            style={{ paddingLeft: 16, fontSize: 16, color: "#BDBDBD" }}
            onFocus={() => setIsShowKeyboard(true)}
          />
          <TouchableOpacity style={styles.commetnBtn}>
            <Image source={require("../assets/img/Send.jpg")} />
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
  },
  imageContainer: {
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
  commentInput: {
    marginHorizontal: 16,
    marginBottom: 16,
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
  },
  commetnBtn: {
    width: 34,
    height: 34,
    marginRight: 8,
    backgroundColor: "#FF6C00",
    borderRadius: 17,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default Comment;
