import React, { useContext } from "react";
import useLightDarkTheme from "../Context/LIGHTMODE"; // Import the context

const Loader = () => {
    const { theme } = useLightDarkTheme(); // Get the current theme from context

    return (
        <div className={`flex justify-center h-screen  w-screen sm:w-5/6 pt-20 ${theme === 'light' ? 'bg-white' : 'bg-[#121212]'}`}>
            <div
                className={`w-12 h-12 border-4 rounded-full animate-spin ${
                    theme === 'light' ? 'border-blue-500 border-t-transparent' : 'border-blue-400 border-t-transparent'
                }`}
            ></div>
        </div>
    );
};

export default Loader;