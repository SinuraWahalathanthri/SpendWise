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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { closeConnection, connectWebSocket } from "@/services/socketServices";
import { useTheme } from "@/hooks/useTheme";

const Transactions = () => {
  const { theme } = useTheme();
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
    let userId = null;

    const init = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (!userData) return;

        const user = JSON.parse(userData);
        userId = user.id;

        await fetchTransactions(userId);

        connectWebSocket(userId, (data) => {
          if (data.type === "update") {
            const formatted = data.transactions.map((item: any) => ({
              id: item.id.toString(),
              title: item.title || item.category,
              amount: Number(item.amount),
              type: (item.type || item.transactionType)?.toLowerCase(),
              rawDate: item.date || item.transactionDate,
              date: new Date(
                item.date || item.transactionDate,
              ).toLocaleDateString(),
            }));

            setTransactions(formatted);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    init();

    return () => {
      closeConnection();
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text,
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 15,
    },
    tabContainer: {
      flexDirection: "row",
      marginHorizontal: 20,
      marginBottom: 15,
      backgroundColor: theme.inputBackground,
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
      backgroundColor: theme.primary,
    },
    tabText: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: "500",
    },
    activeTabText: {
      color: theme.white,
    },
    transactionItem: {
      backgroundColor: theme.card,
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
      color: theme.text,
    },
    transactionDate: {
      fontSize: 12,
      color: theme.textSecondary,
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
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50,
      paddingHorizontal: 20,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.textSecondary,
      marginTop: 10,
    },
    emptySubtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 5,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Text style={styles.title}>Transactions</Text>

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
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={60}
                color={theme.textSecondary}
              />

              <Text style={styles.emptyTitle}>No transaction history</Text>

              <Text style={styles.emptySubtitle}>
                You don't have any {activeTab} transactions yet
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default Transactions;
