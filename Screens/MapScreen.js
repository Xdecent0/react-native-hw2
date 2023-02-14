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
import { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import MapView, { Marker } from "react-native-maps";

export default function Map({ navigation, route }) {
  const coords = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
          <Image source={require("../assets/img/arrow-left.jpg")} />
        </TouchableOpacity>

        <Text style={styles.title}>Карта</Text>
        <View
          style={{ width: 24, height: 24, backgroundColor: "transparent" }}
        />
      </View>

      <View style={styles.main}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={coords} />
        </MapView>
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
    flex: 1,
  },
});
