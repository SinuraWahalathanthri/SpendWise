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
import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/hooks/useTheme";

const AddTransactionButton = () => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense",
  );
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

  const saveTransaction = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);
    const payload = {
      transactionType,
      wallet,
      category: category?.name,
      amount: parseFloat(amount),
      note,
      transactionDate: selectedDate,
      userId: user.id,
    };

    fetch("http://10.0.2.2:8080/spendwise/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Transaction saved:", data);
        setModalVisible(false);
      })
      .catch((err) => console.error(err));
  };

  const styles = StyleSheet.create({
    addButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
      marginTop: -20,
      shadowColor: theme.primary,
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
      backgroundColor: theme.card,
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
      color: theme.primary,
      width: 60,
    },
    sheetTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
    },
    typeSelector: {
      flexDirection: "row",
      backgroundColor: theme.inputBackground,
      borderRadius: 12,
      padding: 4,
      marginBottom: 20,
    },
    typeButtonActive: {
      backgroundColor: theme.background,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    typeButtonText: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: "500",
    },
    typeButtonTextActive: {
      color: theme.text,
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
      borderBottomColor: theme.border,
      gap: 12,
    },
    inputLabel: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
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
      borderBottomColor: theme.border,
      gap: 12,
    },
    currencyLabel: {
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.inputBackground,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      fontWeight: "500",
    },
    amountInput: {
      flex: 1,
      fontSize: 32,
      color: theme.text,
      fontWeight: "300",
    },
    categoryIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.inputBackground,
      alignItems: "center",
      justifyContent: "center",
    },
    placeholderText: {
      flex: 1,
      fontSize: 16,
      color: theme.textSecondary,
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      gap: 12,
    },
    dateSelector: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.inputBackground,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    dateText: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: "500",
    },
    saveButton: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 20,
    },
    saveButtonText: {
      fontSize: 16,
      color: theme.white,
      fontWeight: "600",
    },
    dropdown: {
      backgroundColor: theme.inputBackground,
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
      borderBottomColor: theme.border,
    },
    dropdownText: {
      fontSize: 16,
      color: theme.text,
    },
    noteContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 12,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    noteInput: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      minHeight: 60,
      textAlignVertical: "top",
    },
  });

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
            <View style={styles.sheetHeader}>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Add Transaction</Text>
              <View style={{ width: 60 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
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
              </View>

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
                    color={theme.textSecondary}
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
                          color={theme.primary}
                        />

                        <Text style={styles.dropdownText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.amountContainer}>
                <Text style={styles.currencyLabel}>LKR</Text>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={theme.textSecondary}
                />
              </View>

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
                        backgroundColor: category
                          ? category.color
                          : theme.inputBackground,
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
                    color={theme.textSecondary}
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

              <View style={styles.noteContainer}>
                <MaterialCommunityIcons
                  name="text-box-outline"
                  size={22}
                  color={theme.textSecondary}
                />

                <TextInput
                  style={styles.noteInput}
                  placeholder="Add note..."
                  placeholderTextColor={theme.textSecondary}
                  value={note}
                  onChangeText={setNote}
                  multiline
                />
              </View>

              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => setShowDatePicker(true)}
              >
                <MaterialCommunityIcons
                  name="calendar-blank"
                  size={24}
                  color={theme.textSecondary}
                />

                <View style={styles.dateSelector}>
                  <Text style={styles.dateText}>
                    {formatDate(selectedDate)}
                  </Text>

                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={22}
                    color={theme.textSecondary}
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

              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveTransaction}
              >
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
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: theme.card,
          borderTopWidth: 1,
          borderTopColor: theme.border,
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
