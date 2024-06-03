import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import menuItems, { MenuItem } from "@/constants/MenuItems";

const Dropdown: React.FC = () => {
  const scaleAnimation = new Animated.Value(0); // Start with 0 to make it invisible

  useEffect(() => {
    // Animate the scale from 0 to 1
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 300, // Adjust the duration as needed
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []); // Run this effect only once when the component mounts

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.modal, { transform: [{ scale: scaleAnimation }] }]}
      >
        <View style={styles.dropdownContent}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.key}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  console.log(`${item.title} clicked`);
                }}
              >
                <Text style={styles.menuItemText}>{item.title}</Text>
                <Ionicons
                  name={item.icon}
                  size={24}
                  style={styles.menuItemIcon}
                />
              </TouchableOpacity>
              {/* Adding the View component below the menu item */}
              {index < menuItems.length - 1 && (
                <View
                  style={{
                    flex: 1,
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: Colors.gray, // Assuming Colors.gray is defined
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 10,
    bottom: 90,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensure it's on top of every other element
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  dropdownContent: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  menuItemIcon: {
    marginRight: 12,
    marginLeft: 80,
    fontWeight: "bold",
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default Dropdown;
