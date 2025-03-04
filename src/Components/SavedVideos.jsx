import React, { useState, useContext } from "react";
import { PiListPlusLight } from "react-icons/pi";
import SavedVideoCard from "./SavedVideosCard";
import useLightDarkTheme from "../Context/LIGHTMODE";
import AppTheme from "../Context/theme";

const SavedVideos = () => {
    const { savedVideos, removeFromSavedVideos } = useContext(AppTheme);
    const [searchVal, setSearchVal] = useState("");
    const { theme } = useLightDarkTheme(); 

    // Filter saved videos based on search input
    const filteredVideos = savedVideos.filter((video) =>
        video.title.toLowerCase().includes(searchVal.toLowerCase())
    );

    return (
        <div className={`flex flex-col flex-grow min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-[#121212]'}`}>
            {/* Page Header */}
            <div className={`flex items-center gap-4 h-20 p-7 ${theme === 'light' ? 'bg-gray-200' : 'bg-[#181818]'} mb-4`}>
                <div className={`p-2 rounded-3xl ${theme === 'light' ? 'text-red-600' : 'text-red-500 bg-black'}`}>
                    <PiListPlusLight size={30} />
                </div>
                <p className={`text-2xl font-medium ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    Saved Videos
                </p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search saved videos..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className={`w-full md:w-[50%] p-2 border rounded-md ${
                        theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-transparent text-white border-gray-700'
                    }`}
                />
            </div>

            {/* Saved Videos List / No Videos Message */}
            <div className="flex-grow flex flex-col items-center justify-center">
                {filteredVideos.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 py-5 px-5 w-full">
                        {filteredVideos.map((video) => (
                            <SavedVideoCard 
                                key={video.id} 
                                video={video} 
                                removeFromSavedVideos={removeFromSavedVideos} 
                                theme={theme} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-cente w-full">
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
                            alt="no saved videos"
                            className="w-[40%] max-w-md"
                        />
                        <p className={`text-xl font-medium mt-5 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                            No saved videos found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedVideos;
