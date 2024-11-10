import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

function ThemeContextProvider({ children }) {
    const themes = {
        dark: {
            backgroundColor: '#202428',
            color: 'white',
        },
        light: {
            backgroundColor: 'white',
            color: 'black',
        },
    };

    const storedTheme = localStorage.getItem('isDark');
    const initialIsDark = storedTheme ? JSON.parse(storedTheme) : false;

    const [isDark, setIsDark] = useState(initialIsDark);
    const theme = isDark ? themes.dark : themes.light;

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        localStorage.setItem('isDark', JSON.stringify(newIsDark));
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('isDark');
        console.log("storedTheme", storedTheme);
        if (storedTheme) {
            setIsDark(JSON.parse(storedTheme));
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;
