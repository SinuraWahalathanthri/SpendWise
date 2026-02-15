import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export default function Index() {
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);

          const response = await fetch(
            "http://10.0.2.2:8080/spendwise/api/users/validate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: parsedUser.email }),
            },
          );

          if (response.ok) {
            const result = await response.json();
            if (result.valid) {
              router.replace("/(tabs)/home");
              return;
            }
          }

          await AsyncStorage.removeItem("user");
        }
      } catch (error) {
        console.log("Error checking login:", error);
      } finally {
        setCheckingLogin(false);
      }
    };

    checkLogin();
  }, []);


  if (checkingLogin) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#e8edb6", "#c4d4ee", "#c4d4ee53", "#ffffff"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            alignItems: "center",
            marginTop: 40,
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Image
            source={require("../assets/images/getstartedpageCard.png")}
            style={{
              width: 450,
              height: 230,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ marginTop: "auto", paddingBottom: 30 }}>
          <Text
            style={{ fontSize: 35, fontFamily: "InterBold", color: "#000" }}
          >
            Smart View
          </Text>

          <Text
            style={{
              fontSize: 35,
              fontFamily: "InterSemiBold",
              color: "#818181",
            }}
          >
            of SpendWise.
          </Text>

          <View style={{ marginTop: 20 }}>
            <Link href={"/(auth)/register"} asChild>
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createText}>Create Wallet</Text>
              </TouchableOpacity>
            </Link>
            <Link href={"/(auth)/login"} asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>I have an account</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: "#030101",
    padding: 20,
    borderRadius: 8,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  createText: {
    color: "#fafafa",
    fontFamily: "InterSemiBold",
    fontSize: 14,
  },
  button: {
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#030101",
  },
  text: {
    color: "#000000",
    fontFamily: "InterSemiBold",
    fontSize: 14,
  },
});
