import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { IoReorderThree } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ✅ Mobile Menu State
    const navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            document.body.style.backgroundColor = '#121212';
        } else {
            document.documentElement.classList.remove('dark');
            document.body.style.backgroundColor = '#ffffff';
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); // ✅ Toggle mobile menu
    };

    const removeToken = () => {
        Cookies.remove('jwt_token');
        navigate('/login');
    };

    return (
        <div className={`w-full sticky top-0 ${isDarkMode ? 'bg-[#121212]' : 'bg-[#ffffff]'} transition-all duration-300 text-${isDarkMode ? 'white' : 'black'}`}>
            
            {/* ✅ Header for Mobile & Desktop */}
            <div className="flex justify-between h-[60px] items-center px-6 w-full">
                <img
                    src={isDarkMode ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"}
                    className="h-[35px] cursor-pointer"
                    alt="logo"
                    onClick={() => navigate('/')}
                />
                
                <div className="flex space-x-4 items-center md:hidden"> 
                    <div onClick={toggleTheme} className="text-lg">
                        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </div>
                    <div onClick={toggleMobileMenu} className="text-lg">
                        <IoReorderThree size={28} />
                    </div>
                    <div onClick={removeToken} className="text-lg"><FiLogOut/></div>
                </div>

                {/* ✅ Desktop Navigation */}
                <div className="hidden md:flex space-x-6 items-center">
                    <div onClick={toggleTheme} className="text-lg">
                        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </div>
                    <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png' alt='profile' className='w-8 h-8 rounded-full' />
                    <div
                        onClick={removeToken}
                        className="text-lg px-4 py-1 rounded border-2 border-solid border-blue-500 cursor-pointer text-blue-700"
                    >
                        Logout
                    </div>
                </div>
            </div>

            {/* ✅ Mobile Menu (Dropdown) */}
            <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4 z-50`}>
                <Link to="/" className="block py-2 px-4 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Home</Link>
                <Link to="/trending" className="block py-2 px-4 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Trending</Link>
                <Link to="/gaming" className="block py-2 px-4 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Gaming</Link>
                <Link to="/saved-videos" className="block py-2 px-4 text-gray-600 hover:text-gray-900" onClick={toggleMobileMenu}>Saved</Link>
                
            </div>

        </div>
    );
};

export default Header;
