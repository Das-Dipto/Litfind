import { createContext, useContext } from "react";
import useLocalStorage from "../CustomHooks/useLocalStorage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // console.log("from theme provider ", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
