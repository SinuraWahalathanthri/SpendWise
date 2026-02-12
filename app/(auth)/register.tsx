import {
  Image,
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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link, router, Stack, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StackScreen } from "react-native-screens";
// import { useAuth } from "@/context/AuthContext";

type Student = {
  id: string;
  name?: string;
  email?: string;
  status?: string;
  password?: string;
  nic?: string;
  otpExpiry?: { toDate: () => Date };
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#ececee" }}>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitle: "",
            headerTransparent: true,
            animation: "slide_from_right",
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
              <Text style={styles.title}>Hey, Welcome to</Text>
              <Text style={[styles.title, { color: "#818181" }]}>
                SpendWise.{" "}
              </Text>
              <Text style={styles.subTitle}>
                Register to track your expenses starting today!
              </Text>
            </View>

            <View style={{ marginTop: 25 }}>
              <View style={styles.inputContainer}>
                <View
                  style={[
                    styles.emailInputWrapper,
                    nameFocused && styles.focusedInput,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={20}
                    color="#818181"
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your name"
                    placeholderTextColor="grey"
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                  />
                </View>
              </View>

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

              <View style={styles.passwordContainer}>
                <View
                  style={[
                    styles.passwordInputWrapper,
                    confirmPasswordFocused && styles.focusedInput,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color="#818181"
                  />

                  <TextInput
                    style={styles.textInput}
                    placeholder="Re-enter password"
                    placeholderTextColor="grey"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setConfirmPasswordFocused(true)}
                    onBlur={() => setConfirmPasswordFocused(false)}
                  />

                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <MaterialCommunityIcons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={22}
                      color="#636363"
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createText}>Sign Up</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Text style={styles.text}>Already have an account?{"  "}</Text>

              <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                <Text style={styles.signUpText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            HDP I - HHDP I Assessment Submission
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignContent: "center",
  },

  signUpText: {
    fontFamily: "LatoBold",
    fontSize: 16,
    lineHeight: 20,
    color: "#000000",
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 35,
    fontFamily: "InterBold",
    color: "#000",
  },
  subTitle: {
    marginTop: 6,
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 15,
  },

  passwordContainer: {
    marginTop: 15,
  },
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
  loginSection: {
    marginTop: 45,
  },
  createButton: {
    backgroundColor: "#030101",
    padding: 20,
    borderRadius: 8,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  createText: {
    color: "#fafafa",
    fontFamily: "InterSemiBold",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontFamily: "LatoBold",
    fontSize: 12,
    lineHeight: 20,
    color: "#424242",
    textAlign: "center",
    marginBottom: 18,
  },
  text: {
    fontFamily: "LatoBold",
    fontSize: 16,
    lineHeight: 20,
    color: "#424242",
    textAlign: "center",
    marginBottom: 18,
  },
  focusedInput: {
    borderColor: "#9ca78c",
    borderWidth: 2,
  },
});
