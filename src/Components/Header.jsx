import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { IoReorderThree } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";
import useLightDarkTheme from "../Context/LIGHTMODE"; // Import the context
import { MdOutlineLightMode } from "react-icons/md";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
                
                {/* ✅ Header for Mobile */}
                <div className="flex space-x-4 items-center md:hidden"> 
                    <div onClick={changeTheme} className="text-lg">
                        {isDarkMode ? <MdOutlineLightMode size={25} className="text-white" /> : <FaMoon size={25} className="text-gray-700" />}
                    </div>
                    <div onClick={toggleMobileMenu} className="text-lg">
                        <IoReorderThree size={28} className={isDarkMode ? 'text-white' : 'text-black'} />
                    </div>

                    {/* ✅ Logout Popup for Mobile */}
                    <Popup 
                        trigger={
                            <div className="text-lg cursor-pointer">
                                <FiLogOut className={isDarkMode ? 'text-white' : 'text-black'} />
                            </div>
                        } 
                        position="center center"
                        modal
                        contentStyle={{
                            width: "350px", 
                            height: "180px", 
                            padding: "20px",
                            border: "none", 
                            borderRadius: "10px",
                            textAlign: "center",
                            backgroundColor: isDarkMode ? "#212121" : "#ffffff", 
                            color: isDarkMode ? "white" : "black",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
                        }}
                    >
                        {close => (
                            <div className="flex flex-col justify-center items-center h-full">
                                <p className="mb-4 text-lg font-medium">Are you sure you want to logout?</p>
                                <div className="flex justify-center gap-4">
                                    <button 
                                        onClick={removeToken} 
                                        className="px-4 py-1 text-white rounded" 
                                        style={{ 
                                            border: "none", 
                                            outline: "none",
                                            backgroundColor: "#dc2626" // Red logout button
                                        }}
                                    >
                                        Confirm
                                    </button>
                                    <button 
                                        onClick={close} 
                                        className="px-4 py-1 rounded" 
                                        style={{ 
                                            border: "none", 
                                            outline: "none",
                                            backgroundColor: isDarkMode ? "#444" : "#ccc",
                                            color: isDarkMode ? "white" : "black"
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>


                {/* ✅ Desktop Navigation */}
                <div className="hidden md:flex space-x-6 items-center">
                    <div onClick={changeTheme} className="text-lg">
                        {isDarkMode ? <MdOutlineLightMode  size={25} className="text-white" /> : <FaMoon size={25} className="text-gray-700" />}
                    </div>
                    <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png' alt='profile' className='w-8 h-8 rounded-full' />
                    
                    <Popup 
                        trigger={
                            <button 
                        className="text-lg px-4 py-1 border-2 rounded cursor-pointer transition-all duration-300"
                        style={{
                            border: "2px solid",
                            borderColor: isDarkMode ? "white" : "black", // White border in dark mode, blue in light mode
                            background: "transparent",
                            color: isDarkMode ? "white" : "black", // Text color matches border
                            padding: "5px 16px",
                            fontSize: "18px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }} 
                    > 
                        Logout
                    </button>

                        } 
                        position="center center"
                        modal
                        contentStyle={{
                            width: "350px", 
                            height: "180px", 
                            padding: "20px",
                            border:"none", 
                            borderRadius: "10px",
                            textAlign: "center",
                            backgroundColor: isDarkMode ? "#212121" : "#ffffff", // Dark mode & light mode background
                            color: isDarkMode ? "white" : "black", // Adjust text color
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
                        }}
                    >
                        {close => (
                            <div className="flex flex-col justify-center items-center h-full">
                                <p className="mb-4 text-lg font-medium">Are you sure you want to logout?</p>
                                <div className="flex justify-center gap-4">
                                    <button 
                                        onClick={removeToken} 
                                        className="px-4 py-1 text-white rounded" 
                                        style={{ 
                                            border: "none", 
                                            outline: "none",
                                            backgroundColor: "#dc2626" // Red logout button
                                        }}
                                    >
                                        Confirm
                                    </button>
                                    <button 
                                        onClick={close} 
                                        className="px-4 py-1 rounded" 
                                        style={{ 
                                            border: "none", 
                                            outline: "none",
                                            backgroundColor: isDarkMode ? "#444" : "#ccc", // Adaptive background
                                            color: isDarkMode ? "white" : "black"
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>




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