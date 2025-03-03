import React, { useState, useContext } from "react";
import { FaFire } from "react-icons/fa";
import SavedVideoCard from "./SavedVideosCard";
import useLightDarkTheme from "../Context/LIGHTMODE";
import { PiListPlusLight } from "react-icons/pi";
 // Import the context
 import AppTheme from "../Context/theme";

const SavedVideos = () => {
    const { savedVideos, removeFromSavedVideos } = useContext(AppTheme);
    const [searchVal, setSearchVal] = useState("");
    const { theme } = useLightDarkTheme(); // Get the current theme from context

    // Filter saved videos based on search value
    const filteredVideos = savedVideos.filter((video) =>
        video.title.toLowerCase().includes(searchVal.toLowerCase())
    );

    return (
        <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-[#121212]'} `}>
            {/* Page Header */}
            <div className={`flex items-center gap-4 h-20 p-7 ${theme === 'light' ? 'bg-gray-200' : 'bg-[#181818]'}  mb-4`}>
                <div className={`${theme === 'light' ? 'text-red-600' : 'text-red-500 rounded-3xl bg-black'} p-2`}>
                    <PiListPlusLight size={30} />
                </div>
                <p className={`text-2xl font-medium ${theme === 'light' ? 'text-black' : 'text-white'}`}>Saved Videos</p>
            </div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search saved videos..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className={`w-full p-2 mb-4 border md:w-[40%] md:ml-9 rounded-md ${
                    theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-transparent text-white border-gray-700'
                }`}
            />

            {/* Show saved videos or empty message */}
            {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 py-5 px-5">
                    {filteredVideos.map((video) => (
                        <SavedVideoCard 
                            key={video.id} 
                            video={video} 
                            removeFromSavedVideos={removeFromSavedVideos} 
                            theme={theme} // Pass the theme to the SavedVideoCard component
                        />
                    ))}
                </div>
            ) : (
                <p className={`text-center mt-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    No saved videos found.
                </p>
            )}
        </div>
    );
};

export default SavedVideos;