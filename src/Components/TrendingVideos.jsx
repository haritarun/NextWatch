import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import TrendingVideoCard from "./TrendingVideosCard";
import { FaFire } from "react-icons/fa";
import Loader from "./Loader";
import useLightDarkTheme from "../Context/LIGHTMODE"; // Import the context

const constNames = {
    Loading: "LOADING",
    Success: "SUCCESS",
    Failed: "FAILED",
};

const TrendingVideos = () => {
    const [searchVal, setSearchVal] = useState("");
    const [videoDetails, setVideoDetails] = useState([]);
    const [status, setStatus] = useState(constNames.Loading);
    const [onSearchVal, setOnSearchVal] = useState("");
    const { theme } = useLightDarkTheme(); // Get the current theme from context

    useEffect(() => {
        fetchingDetails();
    }, [onSearchVal]); 

    const fetchingDetails = async () => {
        const api = "https://apis.ccbp.in/videos/trending";
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

    return (
        <div className={`w-full min-h-screen ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} px-5 py-5`}>
            {/* Trending Header */}
            <div className="flex items-center gap-4 h-15 pb-5">
                <div className={`${theme === 'light' ? 'text-red-600' : 'text-red-500'}`}>
                    <FaFire size={30} />
                </div>
                <p className={`text-3xl font-medium ${theme === 'light' ? 'text-black' : 'text-white'}`}>Trending</p>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 gap-6">
                {videoDetails.map((video) => (
                    <TrendingVideoCard key={video.id} video={video} theme={theme} />
                ))}
            </div>
        </div>
    );
};

export default TrendingVideos;