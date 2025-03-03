import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const Advertisement = () => {
    const [isVisible, setIsVisible] = useState(true);

    const toClose = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="bg-[url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')] bg-cover w-full h-[250px] mt-3">
                <div className="flex flex-col h-full pl-9">
                    {/* Logo and Close Button */}
                    <div className="flex justify-between items-center p-4">
                        <img 
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" 
                            alt="NXT Watch Logo" 
                            className="w-[150px] h-[30px]" 
                        />
                        <div onClick={toClose} className="text-gray-700 hover:text-gray-900 mr-[20%]">
                            <IoMdClose size={24} />
                        </div>
                    </div>

                    {/* Content */}
                    <p className="text-lg text-gray-900">Buy NXT Watch Premium prepaid plans with UPI</p>
                    
                    {/* CTA Button */}
                    <div className="border-2 border-gray-800 w-[150px] text-gray-800 px-4 py-2 mt-4 rounded-md">
                        Get it Now
                    </div>
                </div>
            </div>
        )
    );
};

export default Advertisement;
