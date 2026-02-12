import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Budgets = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={styles.title}>Budgets</Text>
      </SafeAreaView>
    </View>
  );
};

export default Budgets;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
});
