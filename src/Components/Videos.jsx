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
        <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} px-5 py-5`}>
            {/* Search Bar */}
            <div className={`flex md:w-[40%] w-full items-center border-1 ${theme === 'light' ? 'border-gray-600' : 'border-gray-500'} mb-4`}>
                <input
                    className={`border-none outline-none flex-grow p-2 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
                    type="text"
                    placeholder="Search"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && getSearch()}
                />
                <button 
                    className={`h-[35px] px-4 flex items-center justify-center ${theme === 'light' ? 'bg-gray-100 border-l-2 border-gray-600' : 'bg-gray-700 border-l-2 border-gray-500'}`}
                    style={{ color: theme === 'light' ? '#201F1F' : 'white', outline: "none", borderRadius: "0" }}
                    onClick={getSearch}
                >
                    <FiSearch className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'} size={20} />
                </button>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {videoDetails.map((video) => (
                    <VideoCard key={video.id} video={video} theme={theme} />
                ))}
            </div>
        </div>
    );
};

export default Videos;