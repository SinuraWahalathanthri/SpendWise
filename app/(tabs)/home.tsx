import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.balanceContainer}>
              <View style={styles.balanceHeader}>
                <Text style={styles.balanceAmount}>Rs 23,220.00</Text>
                <MaterialCommunityIcons
                  name="eye-outline"
                  size={24}
                  color="#333"
                />
              </View>
              <View style={styles.totalBalanceRow}>
                <Text style={styles.totalBalanceText}>Total balance</Text>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={16}
                  color="#666"
                />
              </View>
            </View>

            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="magnify" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* My Wallets Card */}
          <View style={styles.walletsCard}>
            <View style={styles.walletHeader}>
              <Text style={styles.walletTitle}>My Wallets</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.walletItem}>
              <View style={styles.walletLeft}>
                <View style={styles.walletIcon}>
                  <MaterialCommunityIcons
                    name="wallet"
                    size={24}
                    color="#fff"
                  />
                </View>
                <Text style={styles.walletName}>Cash</Text>
              </View>
              <Text style={styles.walletAmount}>-Rs 23,220.00</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  balanceContainer: {
    flex: 1,
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  totalBalanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  totalBalanceText: {
    fontSize: 14,
    color: "#666",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  walletsCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
  walletItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
  },
  walletLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
  },
  walletName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  walletAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  trialCard: {
    backgroundColor: "#4CAF50",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  trialContent: {
    flex: 1,
  },
  trialTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  trialSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 12,
  },
  trialButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  trialButtonText: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "500",
  },
  trialTimer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 8,
  },
  trialTimerText: {
    fontSize: 12,
    color: "#4CAF50",
  },
  trialIllustration: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  seeReportsText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
  reportCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  statAmountRed: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5252",
  },
  statAmountBlue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2196F3",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  chartContainer: {
    flexDirection: "row",
    height: 200,
  },
  chartYAxis: {
    justifyContent: "space-between",
    paddingRight: 12,
    paddingVertical: 10,
  },
  axisLabel: {
    fontSize: 11,
    color: "#999",
  },
  chartArea: {
    flex: 1,
    position: "relative",
  },
  chartGrid: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  barContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  bar: {
    width: 40,
    height: 160,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "#FF5252",
    borderRadius: 4,
  },
  chartTooltip: {
    position: "absolute",
    top: -60,
    backgroundColor: "#666",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  tooltipAmount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  tooltipDate: {
    fontSize: 11,
    color: "#fff",
    marginTop: 2,
  },
});
