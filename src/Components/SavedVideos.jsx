import React, { useState, useContext } from "react";
import { FaFire } from "react-icons/fa";
import SavedVideoCard from "./SavedVideosCard";
import AppTheme from "../Context/theme";

const SavedVideos = () => {
    // ✅ Use the AppTheme context inside the component function
    const { savedVideos, removeFromSavedVideos } = useContext(AppTheme);
    const [searchVal, setSearchVal] = useState("");

    // Filter saved videos based on search value
    const filteredVideos = savedVideos.filter((video) =>
        video.title.toLowerCase().includes(searchVal.toLowerCase())
    );

    return (
        <div className="w-full min-h-screen bg-gray-100 px-5 py-5">
            {/* Page Header */}
            <div className="flex items-center gap-4 pb-5">
                <div className="text-red-600">
                    <FaFire size={30} />
                </div>
                <p className="text-3xl font-medium">Saved Videos</p>
            </div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search saved videos..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md"
            />

            {/* Show saved videos or empty message */}
            {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {filteredVideos.map((video) => (
                        <SavedVideoCard 
                            key={video.id} 
                            video={video} 
                            removeFromSavedVideos={removeFromSavedVideos} 
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center mt-5">No saved videos found.</p>
            )}
        </div>
    );
};

export default SavedVideos;
