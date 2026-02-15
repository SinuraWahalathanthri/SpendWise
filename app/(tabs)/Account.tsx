import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

const Account = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");

        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser({
            name: parsedUser.name,
            email: parsedUser.email,
          });
        }
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text,
      marginTop: 20,
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    profileCard: {
      backgroundColor: theme.card,
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      elevation: 2,
    },
    profileLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
    },
    avatar: {
      width: 55,
      height: 55,
      borderRadius: 14,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    profileName: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
    },
    profileEmail: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 4,
    },
    card: {
      backgroundColor: theme.card,
      marginHorizontal: 20,
      borderRadius: 16,
      paddingVertical: 10,
      marginBottom: 20,
      elevation: 2,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.textSecondary,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    itemText: {
      fontSize: 15,
      color: theme.text,
      fontWeight: "500",
    },
    logoutButton: {
      backgroundColor: theme.card,
      marginHorizontal: 20,
      padding: 16,
      borderRadius: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      marginBottom: 40,
    },
    logoutText: {
      fontSize: 15,
      fontWeight: "600",
      color: "#FF5252",
    },
  });

  const AccountItem = ({ icon, title }: { icon: string; title: string }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.itemLeft}>
        <MaterialCommunityIcons name={icon} size={22} color={theme.primary} />
        <Text style={styles.itemText}>{title}</Text>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={theme.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Account</Text>

          <View style={styles.profileCard}>
            <View style={styles.profileLeft}>
              <View style={styles.avatar}>
                <MaterialCommunityIcons name="account" size={32} color="#fff" />
              </View>
              <View>
                <Text style={styles.profileName}>{user.name || "User"}</Text>

                <Text style={styles.profileEmail}>
                  {user.email || "email@example.com"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Account Settings</Text>

            <AccountItem icon="account-edit-outline" title="Edit Profile" />
            <AccountItem icon="wallet-outline" title="Manage Wallets" />
            <AccountItem icon="chart-box-outline" title="Reports" />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Preferences</Text>

            <AccountItem icon="bell-outline" title="Notifications" />
            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={22}
                  color={theme.primary}
                />
                <Text style={styles.itemText}>Dark Mode</Text>
              </View>

              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: "#ccc", true: theme.primary }}
                thumbColor="#fff"
              />
            </View>

            <AccountItem icon="currency-usd" title="Currency" />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Security</Text>

            <AccountItem icon="lock-outline" title="Change Password" />
            <AccountItem icon="fingerprint" title="Biometric Login" />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={20} color="#FF5252" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Account;
