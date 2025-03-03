import { useState, useEffect } from "react";
import { AiFillHome, AiFillTwitterCircle } from "react-icons/ai";
import { FaFire, FaGamepad, FaFacebook } from "react-icons/fa";
import { PiListPlusLight } from "react-icons/pi";
import { FaLinkedinIn } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

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

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]); // Update active item when route changes

    const handleNavigation = (id) => {
        setActiveItem(id); 
        navigate(id); 
    };

    return (
        <div className="w-1/6 h-screen flex-col justify-between sticky top-0 overflow-y-auto pt-9 hidden md:flex bg-gray-100">
            {/* Navigation Options */}
            <div className="space-y-3">
                {OptionDetails.map((option) => (
                    <div
                        key={option.id}
                        className={`flex items-center gap-5 p-3 pl-8 cursor-pointer rounded-lg transition-all duration-300
                            ${activeItem === option.id ? "bg-gray-400 text-white font-bold" : "hover:bg-gray-300 text-black"}`}
                        onClick={() => handleNavigation(option.id)}
                    >
                        <option.IconComponent size={25} />
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
                <p className="text-sm mt-3 text-gray-600">
                    Enjoy! Now to see your channels and recommendations!
                </p>
            </div>
        </div>
    );
};

export default SideBar;
