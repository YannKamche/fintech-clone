import React from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);

  return (
    <View style={styles.container}>
      {assets ? (
        <Video
          source={{ uri: assets[0].uri }}
          style={styles.video}
          resizeMode={ResizeMode.COVER} //makes it fit the entire screen
          shouldPlay
          isLooping
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>
          Ready to change the way you make money?
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        {/* To use routing, we will use the Link component */}
        {/* Using an array in the style object allows you to specify custom and default colors */}
        <Link
          href={"/login"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: 'white' },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: "500" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
    width: "100%",
    height: "100%",
    position: "absolute"
    },
    header: {
        fontSize: 36,
        fontWeight: '900',
        color: 'white',
        textTransform: 'uppercase'
    }, 
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 60,
        paddingHorizontal: 20,
    }
});

export default Page;
