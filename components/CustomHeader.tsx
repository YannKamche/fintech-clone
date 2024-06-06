import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = () => {
  //Destructure top to avoid the safeAread
  const { top } = useSafeAreaInsets();
  return (
    <BlurView intensity={80} tint={"extraLight"} style={{ paddingTop: top }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.roundBtn}>
          <Text style={{ color: "#fff", fontWeight: "500", fontSize: 16,}}>
            SG
          </Text>
        </TouchableOpacity>
        <View style={styles.searchSection}>
          <Ionicons
            name="search"
            size={20}
            color={Colors.dark}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.dark}
          />
        </View>

        <View style={styles.circle}>
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name="card" size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: 60,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 0,
    color: Colors.dark,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CustomHeader;
