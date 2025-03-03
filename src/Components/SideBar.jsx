import { useState, useEffect, useContext } from "react";
import { AiFillHome, AiFillTwitterCircle } from "react-icons/ai";
import { FaFire, FaGamepad, FaFacebook } from "react-icons/fa";
import { PiListPlusLight } from "react-icons/pi";
import { FaLinkedinIn } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

import useLightDarkTheme from "../Context/LIGHTMODE"; 

const OptionDetails = [
    { id: "/", name: "Home", IconComponent: AiFillHome },
    { id: "/trending", name: "Trending", IconComponent: FaFire },
    { id: "/gaming", name: "Gaming", IconComponent: FaGamepad },
    { id: "/saved-videos", name: "Saved videos", IconComponent: PiListPlusLight }
];

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const { theme } = useLightDarkTheme(); // Get the current theme from context

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]); // Update active item when route changes

    const handleNavigation = (id) => {
        setActiveItem(id); 
        navigate(id); 
    };

    return (
        <div className={`w-1/6 h-screen flex-col justify-between sticky top-0 overflow-y-auto pt-3 hidden md:flex 
                        ${theme === 'light' ? 'bg-white text-black' : 'bg-[#212121] text-white'}`}>
            {/* Navigation Options */}
            <div className="">
                {OptionDetails.map((option) => (
                    <div
                        key={option.id}
                        className={`flex items-center gap-5 p-3 pl-8 cursor-pointer  transition-all duration-300
                            ${activeItem === option.id ? 
                                (theme === 'light' ? 'bg-gray-300 text-black font-bold' : 'bg-[#383838] text-white font-bold') 
                                : (theme === 'light' ? 'hover:bg-gray-200 text-black' : 'hover:bg-[#383838] text-white')}`}
                        onClick={() => handleNavigation(option.id)}
                    >
                        <option.IconComponent 
    size={25} 
    className={`${activeItem === option.id ? (theme === 'light' ? '' : 'text-red-700') : ''}`} 
/>

                        <p className="text-lg font-medium">{option.name}</p>
                    </div>
                ))}
            </div>

            {/* Footer Section */}
            <div className="mt-auto p-4">
                <p className="text-lg font-semibold">Contact Us</p>
                <div className="flex gap-4 mt-3">
                    <FaFacebook size={30} className="text-[#345A99] cursor-pointer hover:opacity-80" />
                    <AiFillTwitterCircle size={30} className="text-[#3EABF2] cursor-pointer hover:opacity-80" />
                    <FaLinkedinIn size={30} className="text-[#0076B0] cursor-pointer hover:opacity-80" />
                </div>
                <p className={`text-sm mt-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Enjoy! Now to see your channels and recommendations!
                </p>
            </div>
        </div>
    );
};

export default SideBar;