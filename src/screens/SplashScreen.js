import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          color: "#929192",
          fontWeight: "600",
          textAlign: "center",
          fontSize: 30,
          letterSpacing: 1,
        }}
      >
        TBD
      </Text>
      <Text
        style={{
          color: "#929192",
          fontWeight: "600",
          textAlign: "center",
          fontSize: 30,
          letterSpacing: 1,
        }}
      >
        SPLASH
      </Text>
    </View>
  );
};

export default SplashScreen;
