import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

const Budgets = () => {
  const { theme } = useTheme();

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
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={styles.title}>Budgets</Text>
      </SafeAreaView>
    </View>
  );
};

export default Budgets;
