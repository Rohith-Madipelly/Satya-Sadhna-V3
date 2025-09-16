import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import Constants from "expo-constants";
 
export default function Footer() {
  const version = Constants.expoConfig.version ?? "1.1.1";
 
  return (
    <View style={styles.footerContainer}>
      {Platform.OS !== "web" && (
        <Text style={[styles.footerText, { fontFamily: "FiraCode" }]}>
          App Version {version}
        </Text>
      )}
 
      <View style={styles.footerTextContainer}>
        <Text
          style={[styles.footerText, { fontFamily: "Arvo", paddingTop: 4 }]}
        >
          Developed by{" "}
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://analogueitsolutions.com/")}
        >
          <Text style={styles.linkText}>Analogue IT Solutions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#aaa",
    alignSelf: "center",
    textAlign: "center",
  },
  footerTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 2,
    marginTop: 2,
  },
  linkText: {
    fontFamily: "Arvo",
    fontWeight: "500",
    fontSize: 12,
    color: "#4da6ff",
    textDecorationLine: "underline",
    paddingTop: 2,
    alignSelf: "center",
  },
});