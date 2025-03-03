import React, { createContext, useContext, useState, useEffect } from "react";

const LightDarkTheme = createContext(null);

export const LightDarkThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "light";
        }
        return "light"; // Default for SSR
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const changeTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <LightDarkTheme.Provider value={{ theme, changeTheme }}>
            {children}
        </LightDarkTheme.Provider>
    );
};

export const useLightDarkTheme = () => {
    const context = useContext(LightDarkTheme);
    if (!context) {
        throw new Error("useLightDarkTheme must be used within LightDarkThemeProvider");
    }
    return context;
};

export default useLightDarkTheme;
