import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useFonts } from "expo-font";

function Post({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  if (!fontsLoaded || !posts) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{ width: 24, height: 24, backgroundColor: "transparent" }}
        />
        <Text style={styles.title}>Публикации</Text>
        <TouchableOpacity style={styles.logout}>
          <Image source={require("../assets/img/log-out.jpg")} />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.profile}>
          <Image
            style={styles.avatar}
            source={require("../assets/img/AvatarGirl.jpg")}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>NickName</Text>
            <Text style={styles.email}>Email</Text>
          </View>
        </View>
        <View style={styles.posts}>
          <FlatList
            data={posts}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <View style={styles.postItem}>
                <View>
                  <Image
                    source={{ uri: item.photo }}
                    style={{ width: 350, height: 200 }}
                  />
                </View>
                <View style={styles.credentials}>
                  <Text style={styles.postName}>{item.name}</Text>
                  <View style={styles.postMedia}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Comment", {
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
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Map", item.coords)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image source={require("../assets/img/map-pin.jpg")} />
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
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
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
  profile: {
    marginTop: 32,
    marginLeft: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  profileInfo: {
    marginLeft: 8,
  },
  name: {
    fontFamily: "RobotoMedium",
    fontSize: 13,
  },
  email: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
  },
  posts: {
    marginHorizontal: 16,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  postItem: {
    marginTop: 35,
  },
  postBackdrop: {
    width: 343,
    height: 240,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
  postImage: {
    width: 343,
    height: 240,
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
  postMedia: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Post;
