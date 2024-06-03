import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import RoundBtn from "@/components/RoundBtn";
import Dropdown from "@/components/Dropdown";

const Home = () => {
  const balance = 1420;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // onAddMoney function
  const onAddMoney = () => {
    // Handle add money functionality
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.account}>
          <View style={styles.row}>
            <Text style={styles.balance}>{balance}</Text>
            <Text style={styles.currency}>€</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <RoundBtn text={"Add money"} onPress={onAddMoney} icon={"add"} />
          <RoundBtn text={"Exchange"} icon={"refresh"} />
          <RoundBtn text={"Details"} icon={"list"} />
          <RoundBtn
            icon={"ellipsis-horizontal"}
            text={"More"}
            onPress={toggleDropdown}
          />
        </View>
      </ScrollView>
      {isDropdownVisible && <Dropdown />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 30,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default Home;
