import React, { useState } from "react";
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

const Account = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Page Title */}
          <Text style={styles.title}>Account</Text>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileLeft}>
              <View style={styles.avatar}>
                <MaterialCommunityIcons name="account" size={32} color="#fff" />
              </View>
              <View>
                <Text style={styles.profileName}>Sinura</Text>
                <Text style={styles.profileEmail}>sinura@email.com</Text>
              </View>
            </View>
          </View>

          {/* Account Settings */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Account Settings</Text>

            <AccountItem icon="account-edit-outline" title="Edit Profile" />
            <AccountItem icon="wallet-outline" title="Manage Wallets" />
            <AccountItem icon="chart-box-outline" title="Reports" />
          </View>

          {/* Preferences */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Preferences</Text>

            <AccountItem icon="bell-outline" title="Notifications" />
            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={22}
                  color="#4CAF50"
                />
                <Text style={styles.itemText}>Dark Mode</Text>
              </View>

              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: "#ccc", true: "#4CAF50" }}
                thumbColor="#fff"
              />
            </View>

            <AccountItem icon="currency-usd" title="Currency" />
          </View>

          {/* Security */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Security</Text>

            <AccountItem icon="lock-outline" title="Change Password" />
            <AccountItem icon="fingerprint" title="Biometric Login" />
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton}>
            <MaterialCommunityIcons name="logout" size={20} color="#FF5252" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const AccountItem = ({ icon, title }) => (
  <TouchableOpacity style={styles.item}>
    <View style={styles.itemLeft}>
      <MaterialCommunityIcons name={icon} size={22} color="#4CAF50" />
      <Text style={styles.itemText}>{title}</Text>
    </View>

    <MaterialCommunityIcons name="chevron-right" size={22} color="#bbb" />
  </TouchableOpacity>
);

export default Account;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  profileCard: {
    backgroundColor: "#fff",
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
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },

  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  profileEmail: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 10,
    marginBottom: 20,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
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
    color: "#333",
    fontWeight: "500",
  },

  logoutButton: {
    backgroundColor: "#fff",
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
