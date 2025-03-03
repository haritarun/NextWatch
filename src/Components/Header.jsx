import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { IoReorderThree } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";
import useLightDarkTheme from "../Context/LIGHTMODE"; // Import the context

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ✅ Mobile Menu State
    const navigate = useNavigate();

    // Use the context for theme management
    const { theme, changeTheme } = useLightDarkTheme();
    const isDarkMode = theme === "dark";

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); // ✅ Toggle mobile menu
    };

    const removeToken = () => {
        Cookies.remove('jwt_token');
        navigate('/login');
    };

    return (
        <div className={`w-full sticky top-0 ${isDarkMode ? 'bg-[#212121]' : 'bg-[#ffffff]'} transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            
            {/* ✅ Header for Mobile & Desktop */}
            <div className="flex justify-between h-[60px] items-center px-6 w-full">
                <img
                    src={isDarkMode ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"}
                    className="h-[35px] cursor-pointer"
                    alt="logo"
                    onClick={() => navigate('/')}
                />
                
                <div className="flex space-x-4 items-center md:hidden"> 
                    <div onClick={changeTheme} className="text-lg">
                        {isDarkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-gray-700" />}
                    </div>
                    <div onClick={toggleMobileMenu} className="text-lg">
                        <IoReorderThree size={28} className={isDarkMode ? 'text-white' : 'text-black'} />
                    </div>
                    <div onClick={removeToken} className="text-lg">
                        <FiLogOut className={isDarkMode ? 'text-white' : 'text-black'} />
                    </div>
                </div>

                {/* ✅ Desktop Navigation */}
                <div className="hidden md:flex space-x-6 items-center">
                    <div onClick={changeTheme} className="text-lg">
                        {isDarkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-gray-700" />}
                    </div>
                    <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png' alt='profile' className='w-8 h-8 rounded-full' />
                    <div
                        onClick={removeToken}
                        className={`text-lg px-4 py-1 rounded border-2 border-solid border-blue-500 cursor-pointer ${isDarkMode ? 'text-white' : 'text-blue-700'}`}
                    >
                        Logout
                    </div>
                </div>
            </div>

            {/* ✅ Mobile Menu (Dropdown) */}
            <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden absolute top-16 left-0 w-full ${isDarkMode ? 'bg-[#121212]' : 'bg-white'} shadow-md p-4 z-50`}>
                <Link to="/" className={`block py-2 px-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`} onClick={toggleMobileMenu}>Home</Link>
                <Link to="/trending" className={`block py-2 px-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`} onClick={toggleMobileMenu}>Trending</Link>
                <Link to="/gaming" className={`block py-2 px-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`} onClick={toggleMobileMenu}>Gaming</Link>
                <Link to="/saved-videos" className={`block py-2 px-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`} onClick={toggleMobileMenu}>Saved</Link>
            </div>

        </div>
    );
};

export default Header;