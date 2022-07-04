import useTheme from "Hooks/useTheme";
import { createContext } from "react";

const ThemeContext = createContext();
function ThemeProviderContext({ children }) {
  const [theme, toggleTheme] = useTheme();
  const value = { theme, toggleTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProviderContext };
