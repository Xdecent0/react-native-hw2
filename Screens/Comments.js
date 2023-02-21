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
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useState, useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";

export default function Comments({ navigation, route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const { postId, photo } = route.params;
  const { nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    try {
      const postDocRef = await doc(db, "posts", postId);
      await addDoc(collection(postDocRef, "comments"), {
        comment,
        nickname,
        date,
        time,
      });
      await updateDoc(postDocRef, { commentsQuantity: commentsQuantity + 1 });
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };

  const getAllComments = async () => {
    try {
      const ref = await doc(db, "posts", postId);
      onSnapshot(collection(ref, "comments"), (snapshot) => {
        setAllComments(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };

  const commentInputHandler = (text) => setComment(text);

  const keyboardClose = () => {
    setKeyboardShown(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
            <Image source={require("../assets/img/arrow-left.jpg")} />
          </TouchableOpacity>

          <Text style={styles.title}>Коментарі</Text>
          <View
            style={{ width: 24, height: 24, backgroundColor: "transparent" }}
          />
        </View>

        <View style={styles.main}>
          <Image source={{ uri: photo }} style={styles.imageContainer} />
          <FlatList
            data={allComments}
            style={styles.comments}
            renderItem={({ item }) => (
              <View style={styles.userCommentContainer}>
                <View style={styles.userAvatar} />
                <View style={styles.userCommentItem}>
                  <Text style={styles.userCommentText}>{item.comment}</Text>
                  <Text style={styles.userCommentTime}>
                    {item.date} | {item.time}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.commentInput}>
          <TextInput
            placeholder="Коментувати..."
            value={comment}
            onChangeText={commentInputHandler}
            style={{ paddingLeft: 16, fontSize: 16, color: "#BDBDBD" }}
            onFocus={() => setKeyboardShown(true)}
          />
          <TouchableOpacity style={styles.commetnBtn} onPress={createComment}>
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
  comments: {
    marginTop: 32,
  },
  commentContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "grey",
  },
  commentItem: {
    marginLeft: 16,
    marginBottom: 24,
    width: 299,
    minHeight: 69,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    alignItems: "flex-end",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  commentText: {
    fontFamily: "RobotoRegular",
    fontSize: 13,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  commentTime: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    color: "#BDBDBD",
    marginBottom: 16,
    marginRight: 16,
  },
  userCommentContainer: {
    marginHorizontal: 16,
    flexDirection: "row-reverse",
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "grey",
  },
  userCommentItem: {
    marginRight: 16,
    marginBottom: 24,
    width: 299,
    minHeight: 69,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    alignItems: "flex-start",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  userCommentText: {
    fontFamily: "RobotoRegular",
    fontSize: 13,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  userCommentTime: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    color: "#BDBDBD",
    marginBottom: 16,
    marginLeft: 16,
  },
  commentInput: {
    marginHorizontal: 16,
    marginBottom: 16,
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
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
    alignItems: "center",
  },
});
