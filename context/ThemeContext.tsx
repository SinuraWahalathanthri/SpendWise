import React, { createContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkColors, lightColors } from "@/constants/theme";

type ThemeType = typeof lightColors;

type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  toggleTheme: (value: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightColors,
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const value = await AsyncStorage.getItem("darkMode");
    if (value !== null) setIsDarkMode(JSON.parse(value));
  };

  const toggleTheme = async (value: boolean) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem("darkMode", JSON.stringify(value));
  };

  const theme = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
