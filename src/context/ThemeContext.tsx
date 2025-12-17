// src/context/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Appearance, ColorSchemeName } from "react-native";

type ThemeOption = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  currentScheme: ColorSchemeName;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
  currentScheme: Appearance.getColorScheme(),
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeOption>("system");
  const currentScheme = Appearance.getColorScheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
