import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("income");
  const [transactions, setTransactions] = useState<any[]>([]);

  const filteredTransactions = transactions
    .filter((item) => item.type?.toLowerCase() === activeTab)
    .sort(
      (a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime(),
    );

  const fetchTransactions = async (userId: number) => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8080/spendwise/api/transactions/all/${userId}`,
      );

      if (!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();

      const formatted = data.map((item: any) => ({
        id: item.id.toString(),
        title: item.category,
        amount: Number(item.amount),
        type: item.transactionType?.toLowerCase(),
        rawDate: item.transactionDate,
        date: new Date(item.transactionDate).toLocaleDateString(),
      }));

      setTransactions(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);
      await fetchTransactions(user.id);
    };

    init();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {/* Title */}
              <Text style={styles.title}>Transactions</Text>

              {/* Tabs */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeTab === "income" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("income")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "income" && styles.activeTabText,
                    ]}
                  >
                    Income
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeTab === "expense" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("expense")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "expense" && styles.activeTabText,
                    ]}
                  >
                    Expense
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionName}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>

              <Text
                style={[
                  styles.transactionAmount,
                  item.type === "income"
                    ? styles.incomeText
                    : styles.expenseText,
                ]}
              >
                {item.type === "income" ? "+" : "-"} Rs{" "}
                {item.amount.toLocaleString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No transactions found</Text>
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#eee",
    borderRadius: 12,
    padding: 4,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#4CAF50",
  },

  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#fff",
  },

  transactionItem: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },

  transactionName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },

  transactionDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  transactionAmount: {
    fontSize: 15,
    fontWeight: "600",
  },

  incomeText: {
    color: "#4CAF50",
  },

  expenseText: {
    color: "#FF5252",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
  },
});
