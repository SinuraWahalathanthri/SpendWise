import { Stack } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter:Inter_400Regular,
    InterSemiBold:Inter_600SemiBold,
    InterBold:Inter_700Bold
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{}} />
      <Stack.Screen name="login" options={{}} />
    </Stack>
  );
}
