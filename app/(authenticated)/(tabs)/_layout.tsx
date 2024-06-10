import React from "react";
import { StatusBar } from "react-native"; // Import StatusBar from react-native

import CustomHeader from "@/components/CustomHeader";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <>
      {/* Set StatusBar properties */}
      <StatusBar
        barStyle="dark-content" // Specify light or dark content
        backgroundColor={Colors.background} // Set background color
        translucent={false} // Set to false for opaque StatusBar
      />

      {/* Rest of your component */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarBackground: () => (
            <BlurView
              intensity={100}
              tint={"light"}
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Light semi-transparent background
                borderTopColor: "rgba(255, 255, 255, 0.3)", // Light border color with low opacity
                borderTopWidth: 1, // Slight border to enhance glassmorphic effect
              }}
            />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            borderTopWidth: 0,
          },
          headerTransparent: true,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
            header: () => <CustomHeader />,
            headerTransparent: true,
          }}
        />
        <Tabs.Screen
          name="invest"
          options={{
            title: "Invest",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="line-chart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="transfers"
          options={{
            title: "Transfers",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="exchange" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="crypto"
          options={{
            title: "Crypto",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="bitcoin" size={size} color={color} />
            ),
            header: () => <CustomHeader />,
            headerTransparent: true,
          }}
        />
        <Tabs.Screen
          name="lifestyle"
          options={{
            title: "Lifestyle",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="th" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;
