import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkLogin = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        // If user data exists, redirect to home
        router.replace("/(tabs)/home");
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://10.0.2.2:8080/spendwise/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // Save user info to AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(data));
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/(tabs)/home");
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ececee" }}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitle: "",
            headerTransparent: true,
            animation: "slide_from_left",
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flex: 1, paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginTop: "auto" }}>
              <MaterialIcons
                name="money"
                size={50}
                color="black"
                style={{ marginBottom: 20 }}
              />
              <Text style={styles.title}>Welcome Back to,</Text>
              <Text style={[styles.title, { color: "#818181" }]}>
                SpendWise.
              </Text>
              <Text style={styles.subTitle}>
                Login to your account to continue
              </Text>
            </View>

            <View style={{ marginTop: 25 }}>
              <View style={styles.inputContainer}>
                <View
                  style={[
                    styles.emailInputWrapper,
                    emailFocused && styles.focusedInput,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={"#818181"}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor={"grey"}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View style={styles.passwordContainer}>
                <View
                  style={[
                    styles.passwordInputWrapper,
                    passwordFocused && styles.focusedInput,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color="#818181"
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter password"
                    placeholderTextColor="grey"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color="#636363"
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={handleLogin}>
              <Text style={styles.createText}>Sign In</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Text style={styles.text}>Don't have an account?{"  "}</Text>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/register")}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: { fontSize: 35, fontFamily: "InterBold", color: "#000" },
  subTitle: {
    marginTop: 6,
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
  },
  inputContainer: { marginTop: 15 },
  passwordContainer: { marginTop: 15 },
  emailInputWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#989898",
    borderRadius: 8,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 1,
  },
  passwordInputWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#989898",
    borderRadius: 8,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 1,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Inter",
    marginLeft: 8,
    paddingVertical: 0,
    flex: 1,
    color: "#000",
  },
  createButton: {
    backgroundColor: "#030101",
    padding: 20,
    borderRadius: 8,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  createText: { color: "#fafafa", fontFamily: "InterSemiBold", fontSize: 14 },
  footerText: {
    fontFamily: "InterBold",
    fontSize: 12,
    lineHeight: 20,
    color: "#424242",
    textAlign: "center",
    marginBottom: 18,
  },
  text: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    lineHeight: 20,
    color: "#616161",
    textAlign: "center",
    marginBottom: 18,
  },
  focusedInput: { borderColor: "#9ca78c", borderWidth: 2 },
  signUpText: {
    fontFamily: "InterBold",
    fontSize: 16,
    lineHeight: 20,
    color: "#000000",
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "bold",
  },
});
