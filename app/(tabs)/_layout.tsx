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
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const [wallet, setWallet] = useState("Cash");
  const [walletDropdownVisible, setWalletDropdownVisible] = useState(false);

  const [category, setCategory] = useState<any>(null);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

  const [note, setNote] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);


  const categories = [
    { name: "Food", icon: "silverware-fork-knife", color: "#FF5722" },
    { name: "Transport", icon: "car", color: "#2196F3" },
    { name: "Shopping", icon: "shopping", color: "#9C27B0" },
    { name: "Bills", icon: "file-document", color: "#FF9800" },
    { name: "Salary", icon: "cash", color: "#4CAF50" },
  ];



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
              {/* Wallet Selection */}
              <View>
                <TouchableOpacity
                  style={styles.inputRow}
                  onPress={() =>
                    setWalletDropdownVisible(!walletDropdownVisible)
                  }
                >
                  <View style={styles.walletIconSmall}>
                    <MaterialCommunityIcons
                      name={wallet === "Cash" ? "cash" : "credit-card"}
                      size={18}
                      color="#fff"
                    />
                  </View>

                  <Text style={styles.inputLabel}>{wallet}</Text>

                  <MaterialCommunityIcons
                    name={walletDropdownVisible ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#999"
                  />
                </TouchableOpacity>

                {walletDropdownVisible && (
                  <View style={styles.dropdown}>
                    {["Cash", "Card"].map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setWallet(item);
                          setWalletDropdownVisible(false);
                        }}
                      >
                        <MaterialCommunityIcons
                          name={item === "Cash" ? "cash" : "credit-card"}
                          size={20}
                          color="#4CAF50"
                        />

                        <Text style={styles.dropdownText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

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
              {/* Category Selection */}
              <View>
                <TouchableOpacity
                  style={styles.inputRow}
                  onPress={() =>
                    setCategoryDropdownVisible(!categoryDropdownVisible)
                  }
                >
                  <View
                    style={[
                      styles.categoryIcon,
                      {
                        backgroundColor: category ? category.color : "#F3F4F6",
                      },
                    ]}
                  >
                    {category && (
                      <MaterialCommunityIcons
                        name={category.icon}
                        size={18}
                        color="#fff"
                      />
                    )}
                  </View>

                  <Text
                    style={
                      category ? styles.inputLabel : styles.placeholderText
                    }
                  >
                    {category ? category.name : "Select category"}
                  </Text>

                  <MaterialCommunityIcons
                    name={
                      categoryDropdownVisible ? "chevron-up" : "chevron-down"
                    }
                    size={24}
                    color="#999"
                  />
                </TouchableOpacity>

                {categoryDropdownVisible && (
                  <View style={styles.dropdown}>
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat.name}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setCategory(cat);
                          setCategoryDropdownVisible(false);
                        }}
                      >
                        <View
                          style={[
                            styles.categoryIcon,
                            { backgroundColor: cat.color },
                          ]}
                        >
                          <MaterialCommunityIcons
                            name={cat.icon}
                            size={16}
                            color="#fff"
                          />
                        </View>

                        <Text style={styles.dropdownText}>{cat.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Note */}
              <View style={styles.noteContainer}>
                <MaterialCommunityIcons
                  name="text-box-outline"
                  size={22}
                  color="#666"
                />

                <TextInput
                  style={styles.noteInput}
                  placeholder="Add note..."
                  placeholderTextColor="#999"
                  value={note}
                  onChangeText={setNote}
                  multiline
                />
              </View>

              {/* Date Selector */}
              {/* Date Selector */}
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => setShowDatePicker(true)}
              >
                <MaterialCommunityIcons
                  name="calendar-blank"
                  size={24}
                  color="#666"
                />

                <View style={styles.dateSelector}>
                  <Text style={styles.dateText}>
                    {formatDate(selectedDate)}
                  </Text>

                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={22}
                    color="#999"
                  />
                </View>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setSelectedDate(date);
                  }}
                />
              )}

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
    alignItems:"center",
    justifyContent:"center"
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
  dropdown: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 10,
    overflow: "hidden",
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  dropdownText: {
    fontSize: 16,
    color: "#111",
  },

  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  noteInput: {
    flex: 1,
    fontSize: 16,
    color: "#111",
    minHeight: 60,
    textAlignVertical: "top",
  },
});
