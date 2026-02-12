import { Tabs } from "expo-router";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const AddTransactionButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<
    "expense" | "income" | "debt"
  >("expense");
  const [amount, setAmount] = useState("0");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const formatDate = (date: Date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");
    return `${dayName}, ${formattedDate}`;
  };

  return (
    <>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleOpenModal}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={32} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <Pressable
            style={styles.bottomSheet}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View style={styles.sheetHeader}>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Add Transaction</Text>
              <View style={{ width: 60 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Transaction Type Selector */}
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    transactionType === "expense" && styles.typeButtonActive,
                  ]}
                  onPress={() => setTransactionType("expense")}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      transactionType === "expense" &&
                        styles.typeButtonTextActive,
                    ]}
                  >
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    transactionType === "income" && styles.typeButtonActive,
                  ]}
                  onPress={() => setTransactionType("income")}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      transactionType === "income" &&
                        styles.typeButtonTextActive,
                    ]}
                  >
                    Income
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    transactionType === "debt" && styles.typeButtonActive,
                  ]}
                  onPress={() => setTransactionType("debt")}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      transactionType === "debt" && styles.typeButtonTextActive,
                    ]}
                  >
                    Debt/Loan
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Wallet Selection */}
              <TouchableOpacity style={styles.inputRow}>
                <View style={styles.walletIconSmall}>
                  <MaterialCommunityIcons
                    name="wallet"
                    size={20}
                    color="#fff"
                  />
                </View>
                <Text style={styles.inputLabel}>Cash</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>

              {/* Amount Input */}
              <View style={styles.amountContainer}>
                <Text style={styles.currencyLabel}>LKR</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#666"
                />
              </View>

              {/* Category Selection */}
              <TouchableOpacity style={styles.inputRow}>
                <View style={styles.categoryIcon} />
                <Text style={styles.placeholderText}>Select category</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>

              {/* Note */}
              <TouchableOpacity style={styles.inputRow}>
                <MaterialCommunityIcons
                  name="text-box-outline"
                  size={24}
                  color="#666"
                />
                <Text style={styles.inputLabel}>Note</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>

              {/* Date Selector */}
              <View style={styles.dateContainer}>
                <MaterialCommunityIcons
                  name="calendar-blank"
                  size={24}
                  color="#666"
                />
                <View style={styles.dateSelector}>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={24}
                      color="#999"
                    />
                  </TouchableOpacity>
                  <Text style={styles.dateText}>
                    {formatDate(selectedDate)}
                  </Text>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Add More Details */}
              <TouchableOpacity style={styles.addMoreButton}>
                <Text style={styles.addMoreText}>Add more details</Text>
              </TouchableOpacity>

              {/* Save Button */}
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "wallet" : "wallet-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Add"
        options={{
          title: "",
          tabBarIcon: () => <AddTransactionButton />,
          tabBarLabel: () => null,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />

      <Tabs.Screen
        name="Budgets"
        options={{
          title: "Budgets",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "clipboard-text" : "clipboard-text-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: "90%",
  },

  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  cancelText: {
    fontSize: 16,
    color: "#4CAF50",
    width: 60,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  typeSelector: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },

  typeButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  typeButtonText: {
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
  },

  typeButtonTextActive: {
    color: "#111",
  },

  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    gap: 12,
  },

  inputLabel: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },

  walletIconSmall: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    gap: 12,
  },

  currencyLabel: {
    fontSize: 16,
    color: "#111",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontWeight: "500",
  },

  amountInput: {
    flex: 1,
    fontSize: 32,
    color: "#111",
    fontWeight: "300",
  },

  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },

  placeholderText: {
    flex: 1,
    fontSize: 16,
    color: "#999",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    gap: 12,
  },

  dateSelector: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  dateText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
  addMoreButton: {
    alignItems: "center",
    paddingVertical: 20,
  },
  addMoreText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
  },

  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },

  saveButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
