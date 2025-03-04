import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import VideoCard from "./VideoCard";
import { FiSearch } from "react-icons/fi";
import Loader from "./Loader";
import useLightDarkTheme from "../Context/LIGHTMODE"; // Import the context

const constNames = {
    Loading: "LOADING",
    Success: "SUCCESS",
    Failed: "FAILED",
};

const Videos = () => {
    const [searchVal, setSearchVal] = useState("");
    const [videoDetails, setVideoDetails] = useState([]);
    const [status, setStatus] = useState(constNames.Loading);
    const [onSearchVal, setOnSearchVal] = useState("");
    const { theme } = useLightDarkTheme(); // Get the current theme from context

    useEffect(() => {
        fetchingDetails();
    }, [onSearchVal]); 

    const fetchingDetails = async () => {
        const api = `https://apis.ccbp.in/videos/all?search=${onSearchVal}`;
        const login_token = Cookies.get("jwt_token");
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${login_token}`,
            },
        };

        try {
            const response = await fetch(api, options);
            if (response.ok) {
                const data = await response.json();
                const tempDetails = data.videos.map((video) => ({
                    id: video.id,
                    title: video.title,
                    thumbnailUrl: video.thumbnail_url,
                    viewCount: video.view_count,
                    publishedAt: video.published_at,
                    channel: {
                        name: video.channel.name,
                        profileImageUrl: video.channel.profile_image_url,
                    },
                }));
                setVideoDetails(tempDetails);
                setStatus(constNames.Success);
            } else {
                setStatus(constNames.Failed);
            }
        } catch (e) {
            setStatus(constNames.Failed);
        }
    };

    if (status === constNames.Loading) return <Loader/>;

    const getSearch = () => {
        setOnSearchVal(searchVal);
    };

    return (
        <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-[#121212]'} px-5 py-5`}>
            {/* Search Bar */}
            <div className={`flex md:w-[40%] w-full items-center border-1 ${theme === 'light' ? 'border-gray-600' : 'border-gray-500'} mb-4`}>
                <input
                    className={`border-none outline-none flex-grow p-2 ${theme === 'light' ? 'bg-white text-black' : 'transparent text-white'}`}
                    type="text"
                    placeholder="Search"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && getSearch()}
                />
                <div
                    className={`h-[37px] pl-5 pr-5 mt-[1px] px-4 flex items-center justify-center ${theme === 'light' ? 'bg-gray-100  border-gray-600' : 'bg-[#212121]  border-gray-500'}`}
                    style={{ color: theme === 'light' ? '#201F1F' : 'black', outline: "none", borderRadius: "0" }}
                    onClick={getSearch}
                >
                    <FiSearch className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'} size={20} />
                </div>
            </div>

            {/* Show No Results Image If No Videos Found */}
            {videoDetails.length === 0 ? (
                <div className="flex flex-col items-center text-center mt-10">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                        alt="No search results"
                        className="w-[40%] max-w-xs"
                    />
                    <p className={`text-xl font-medium mt-5 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        No Search Results Found
                    </p>
                    <p className={`text-gray-500 ${theme === 'light' ? 'text-black' : 'text-gray-400'}`}>
                        Try different keywords or check your internet connection.
                    </p>
                </div>
            ) : (
                // Video Grid Display
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {videoDetails.map((video) => (
                        <VideoCard key={video.id} video={video} theme={theme} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Videos;