import { Stack } from "expo-router";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const AuthLayout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    />
  );
};

export default AuthLayout;
