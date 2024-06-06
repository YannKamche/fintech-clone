// Dropdown.tsx

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
import menuItems from "@/constants/MenuItems";

interface DropdownProps {
  position: { x: number; y: number };
  onClose: () => void; // New prop for closing the dropdown
}

const Dropdown: React.FC<DropdownProps> = ({ position, onClose }) => {
  const scaleAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleMenuItemClick = () => {
    onClose(); // Close the dropdown when a menu item is clicked
  };

  return (
    <View
      style={[styles.container, { top: position.y, left: position.x - 200 }]}
    >
      <Animated.View
        style={[styles.modal, { transform: [{ scale: scaleAnimation }] }]}
      >
        <View style={styles.dropdownContent}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuItem}
              onPress={() => {
                handleMenuItemClick(); // Call the handler function on press
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
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9999,
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
