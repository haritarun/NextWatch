import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import GamingVideoCard from "./GamingVideosCard";
import { FaGamepad } from "react-icons/fa";
import Loader from "./Loader";
const constNames = {
    Loading: "LOADING",
    Success: "SUCCESS",
    Failed: "FAILED",
};

const GamingVideos = () => {
    const [searchVal, setSearchVal] = useState("");
    const [videoDetails, setVideoDetails] = useState([]);
    const [status, setStatus] = useState(constNames.Loading);
    const [onSearchVal, setOnSearchVal] = useState("");

    useEffect(() => {
        fetchingDetails();
    }, [onSearchVal]); 

    const fetchingDetails = async () => {
        const api = "https://apis.ccbp.in/videos/gaming";
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
        <div className="w-full min-h-screen bg-gray-100 px-5 py-5">
            <div className="flex items-center gap-4 h-15 pb-5">
                <div className="text-red-600"><FaGamepad size={30}/></div>
                    <p className="text-3xl font-medium">Gaming</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videoDetails.map((video) => (
                    <GamingVideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default GamingVideos;
