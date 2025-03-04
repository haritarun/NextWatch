import React from "react";
import useLightDarkTheme from "../Context/LIGHTMODE";

const NotFoundPage = () => {
    const { theme } = useLightDarkTheme(); // Get the theme from context

    const notFoundImg =
        theme === "light"
            ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            : "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png";

    return (
        <div className={`w-full h-screen flex flex-col justify-center items-center ${theme === 'light' ? 'bg-gray-100' : 'bg-[#181818]'}`}>
            <img src={notFoundImg} alt="Page Not Found" className="w-[40%] max-w-sm" />
            <p className={`font-bold text-2xl pt-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                Page Not Found
            </p>
            <p className={`text-lg text-gray-600 ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
                We are sorry, the page you requested could not be found.
            </p>
        </div>
    );
};

export default NotFoundPage;
