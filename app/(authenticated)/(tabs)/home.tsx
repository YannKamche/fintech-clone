import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import RoundBtn from "@/components/RoundBtn";
import Dropdown from "@/components/Dropdown";
import { useBalanceStore } from "@/store/balanceStore";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  //import from zustand
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // onAddMoney function
  const onAddMoney = () => {
    // Handle add money functionality
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: 'Added money'
    })
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.account}>
          <View style={styles.row}>
            <Text style={styles.balance}>{balance()}</Text>
            <Text style={styles.currency}>€</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <RoundBtn text={"Add money"} onPress={onAddMoney} icon={"add"} />
          <RoundBtn
            text={"Exchange"}
            icon={"refresh"}
            onPress={clearTransactions}
          />
          <RoundBtn text={"Details"} icon={"list"} />
          <RoundBtn
            icon={"ellipsis-horizontal"}
            text={"More"}
            onPress={toggleDropdown}
          />
        </View>

        <Text style={defaultStyles.sectionHeader}>Transactions</Text>
        <View style={styles.transactions}>
          {transactions.length === 0 && (
            <Text style={{ padding: 14, color: Colors.gray }}>
              No Transactions yet
            </Text>
          )}
          {transactions.reverse().map((transaction) => (
            <View
              key={transaction.id}
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <View style={styles.circle}>
                <Ionicons
                  name={transaction.amount > 0 ? "add" : "remove"}
                  size={24}
                  color={Colors.dark}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "400" }}>{transaction.title}</Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {new Date(transaction.date).toLocaleDateString()}
                </Text>
              </View>

              <Text>{transaction.amount}€</Text>
            </View>
          ))}
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
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;
