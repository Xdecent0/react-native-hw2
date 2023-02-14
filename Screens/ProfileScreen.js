import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Profile({ navigation }) {
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
                source={require("../assets/img/addprofiles.jpg")}
              />
            </View>
            <TouchableOpacity style={styles.logout}>
              <Image source={require("../assets/img/log-out.jpg")} />
            </TouchableOpacity>

            <Text style={styles.username}>Name</Text>
            <View style={styles.posts}></View>
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
});
