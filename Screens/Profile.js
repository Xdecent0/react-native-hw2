import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { authSignOutUser } from "../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { FlatList } from "react-native-gesture-handler";

export default function Profile({ navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const { userId, nickname } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    try {
      const ref = query(
        collection(db, "posts"),
        where("userId", "==", `${userId}`)
      );
      onSnapshot(ref, (snapshot) => {
        setUserPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/img/RegBG.jpg")}
        style={styles.image}
      >
        <View style={styles.screen}>
          <View style={styles.postsContainer}>
            <View style={styles.avatar}>
              <Image
                source={require("../assets/img/AvatarGirl.jpg")}
                style={{ resizeMode: "cover", marginBottom: -45 }}
              />
              <Image
                style={styles.remBtn}
                source={require("../assets/img/addlog.jpg")}
              />
            </View>
            <TouchableOpacity
              onPress={() => dispatch(authSignOutUser())}
              style={styles.logout}
            >
              <Image source={require("../assets/img/log-out.jpg")} />
            </TouchableOpacity>

            <Text style={styles.username}>{nickname}</Text>
            <View style={styles.posts}>
              <FlatList
                data={userPosts}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                  <View style={styles.postItem}>
                    <View>
                      <Image
                        source={{ uri: item.photo }}
                        style={styles.postImage}
                      />
                    </View>
                    <View style={styles.credentials}>
                      <Text style={styles.postName}>{item.name}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Comments", {
                                photo: item.photo,
                                postId: item.id,
                              })
                            }
                          >
                            <Image
                              source={require("../assets/img/message-circle.jpg")}
                            />
                          </TouchableOpacity>
                          <Text
                            style={{
                              color: "#BDBDBD",
                              fontFamily: "RobotoRegular",
                              fontSize: 16,
                              marginLeft: 6,
                            }}
                          >
                            0
                          </Text>
                          <Image
                            source={require("../assets/img/like.jpg")}
                            style={{ marginLeft: 24 }}
                          />
                          <Text
                            style={{
                              color: "#BDBDBD",
                              fontFamily: "RobotoRegular",
                              fontSize: 16,
                              marginLeft: 6,
                            }}
                          >
                            0
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/img/map-pin.jpg")}
                          />
                          <Text
                            style={{
                              fontFamily: "RobotoRegular",
                              fontSize: 16,
                              marginLeft: 4,
                              textDecorationLine: "underline",
                            }}
                          >
                            {item.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
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
    marginBottom: -100,
  },
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
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
  remBtn: {
    marginRight: -20,
    marginBottom: 5,
    width: 40,
    height: 40,
  },
  postsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    height: 665,
    position: "relative",
  },
  logout: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 22,
    marginRight: 16,
  },
  username: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    marginTop: 32,
  },
  posts: {
    marginHorizontal: 16,
    marginTop: 33,
    justifyContent: "center",
  },
  postItem: {
    marginTop: 35,
  },
  postImage: {
    width: 343,
    height: 240,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
  credentials: {
    marginTop: 8,
  },
  postName: {
    fontFamily: "RobotoMedium",
    fontSize: 16,
    marginBottom: 8,
  },
});
