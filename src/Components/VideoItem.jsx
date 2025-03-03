import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"; 
import Cookies from "js-cookie";
import Header from "./Header";
import SideBar from "./SideBar";
import VideoItemDetails from "./VideoItemDetails";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BiListPlus } from "react-icons/bi";
import AppTheme from "../Context/theme";
import Loader from "./Loader";

const constNames = {
    Loading: "LOADING",
    Success: "SUCCESS",
    Failed: "FAILED",
};

const VideoItem = () => {
    const { id } = useParams(); 
    const [status, setStatus] = useState(constNames.Loading);
    const [videoDetails, setVideoDetails] = useState(null);

    const {
        savedVideos, addToSavedVideos, removeFromSavedVideos,
        likedVideos, addToLikedVideos, removeFromLikedVideos,
        dislikedVideos, addToDislikedVideos, removeFromDislikedVideos
    } = useContext(AppTheme);

    useEffect(() => {
        if (!id) return;
        fetchDetails();
    }, [id]);

    const fetchDetails = async () => {
        const api = `https://apis.ccbp.in/videos/${id}`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt_token")}`,
            },
        };

        try {
            const response = await fetch(api, options);
            if (response.ok) {
                const data = await response.json();
                const video = data.video_details;
                const tempVideoDetails = {
                    id: video.id,
                    title: video.title,
                    videoUrl: video.video_url,
                    thumbnailUrl: video.thumbnail_url,
                    channel: {
                        name: video.channel.name,
                        profileImageUrl: video.channel.profile_image_url,
                        subscriberCount: video.channel.subscriber_count,
                    },
                    viewCount: video.view_count,
                    publishedAt: video.published_at,
                    description: video.description,
                };
                setVideoDetails(tempVideoDetails);
                setStatus(constNames.Success);
            } else {
                setStatus(constNames.Failed);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            setStatus(constNames.Failed);
        }
    };

    if (status === constNames.Loading) return <Loader/>;
    if (status === constNames.Failed) return <p>Failed to load video.</p>;

    if (!videoDetails) return null;

    const isLiked = likedVideos.some(video => video.id === videoDetails.id);
    const isDisliked = dislikedVideos.some(video => video.id === videoDetails.id);
    const isSaved = savedVideos.some(video => video.id === videoDetails.id);

    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Header */}
            <Header />

            {/* Main Content: Sidebar + Video Details */}
            <div className="flex w-full flex-row flex-grow h-full">
                <SideBar />

                {/* Main Video Section */}
                <div className="flex-grow  w-full overflow-y-auto scrollbar-hide p-5">
                    <VideoItemDetails url={videoDetails.videoUrl} />
                    <p className="text-lg font-medium pt-3 mb-2">{videoDetails.title}</p>

                    {/* Views and Published Date */}
                    <div className="flex flex-col md:flex-row justify-between mt-4">
                        <div className="flex mt-2 text-sm text-gray-600">
                            <p>{videoDetails.viewCount} views</p>
                            <p className="ml-2">
                                {formatDistanceToNowStrict(new Date(videoDetails.publishedAt), { addSuffix: true })}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {/* Like Button */}
                            <div
                                className={`rounded-md flex items-center gap-2 p-2 ${
                                    isLiked ? "text-blue-500" : "text-gray-600"
                                }`}
                                onClick={() => {
                                    if (isLiked) {
                                        removeFromLikedVideos(videoDetails.id);
                                    } else {
                                        addToLikedVideos(videoDetails);
                                        removeFromDislikedVideos(videoDetails.id); // Remove dislike if liked
                                    }
                                }}
                            >
                                <AiOutlineLike /> {isLiked ? "Liked" : "Like"}
                            </div>

                            {/* Dislike Button */}
                            <div
                                className={`rounded-md pointer flex items-center gap-2 p-2 ${
                                    isDisliked ? "text-red-500" : "text-gray-600"
                                }`}
                                onClick={() => {
                                    if (isDisliked) {
                                        removeFromDislikedVideos(videoDetails.id);
                                    } else {
                                        addToDislikedVideos(videoDetails);
                                        removeFromLikedVideos(videoDetails.id); // Remove like if disliked
                                    }
                                }}
                            >
                                <AiOutlineDislike /> {isDisliked ? "Disliked" : "Dislike"}
                            </div>

                            {/* Save Button */}
                            <div
                                className={`rounded-md flex items-center gap-2 p-2 ${
                                    isSaved ? "text-blue-500" : "text-gray-600"
                                }`}
                                onClick={() =>
                                    isSaved ? removeFromSavedVideos(videoDetails.id) : addToSavedVideos(videoDetails)
                                }
                            >
                                <BiListPlus /> {isSaved ? "Saved" : "Save"}
                            </div>
                        </div>
                    </div>

                    <hr className="mt-4" />

                    {/* Channel Info */}
                    <div className="flex items-center mt-4">
                        <img
                            src={videoDetails.channel.profileImageUrl}
                            alt={videoDetails.channel.name}
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-2">
                            <p className="text-sm font-semibold text-gray-700">
                                {videoDetails.channel.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {videoDetails.channel.subscriberCount} subscribers
                            </p>
                        </div>
                    </div>

                    {/* Video Description */}
                    <p className="text-gray-700 mt-4">{videoDetails.description}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;
