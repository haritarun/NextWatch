import { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Trending from './Components/Trending';
import Gaming from './Components/Gaming';
import VideoItem from './Components/VideoItem';
import AppTheme from './Context/theme';
import Saved from './Components/Saved';
import ProtuctedRoute from './Components/ProtuctedRoute';
const App = () => {
    const [savedVideos, setSavedVideos] = useState([]);
    const [likedVideos, setLikedVideos] = useState([]);
    const [dislikedVideos, setDislikedVideos] = useState([]);


    
    // Add to Saved Videos
    const addToSavedVideos = (video) => {
        setSavedVideos((prev) => {
            if (!prev.some((v) => v.id === video.id)) {
                return [...prev, video];
            }
            return prev;
        });
    };

    const removeFromSavedVideos = (videoId) => {
        setSavedVideos((prev) => prev.filter((video) => video.id !== videoId));
    };

    // Add to Liked Videos
    const addToLikedVideos = (video) => {
        setLikedVideos((prev) => {
            if (!prev.some((v) => v.id === video.id)) {
                return [...prev, video];
            }
            return prev;
        });
        setDislikedVideos((prev) => prev.filter((vid) => vid.id !== video.id));
    };

    const removeFromLikedVideos = (videoId) => {
        setLikedVideos((prev) => prev.filter((video) => video.id !== videoId));
    };

    // Add to Disliked Videos
    const addToDislikedVideos = (video) => {
        setDislikedVideos((prev) => {
            if (!prev.some((v) => v.id === video.id)) {
                return [...prev, video];
            }
            return prev;
        });
        setLikedVideos((prev) => prev.filter((vid) => vid.id !== video.id));
    };

    const removeFromDislikedVideos = (videoId) => {
        setDislikedVideos((prev) => prev.filter((video) => video.id !== videoId));
    };

    return (
        <AppTheme.Provider
            value={{
                savedVideos,
                addToSavedVideos,
                removeFromSavedVideos,
                likedVideos,
                addToLikedVideos,
                removeFromLikedVideos,
                dislikedVideos,
                addToDislikedVideos,
                removeFromDislikedVideos,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element = {<ProtuctedRoute/>}>
                      <Route path="/" element={<Home />} />
                      <Route path="/trending" element={<Trending />} />
                      <Route path="/gaming" element={<Gaming />} />
                      <Route path="/saved-videos" element={<Saved />} />
                      <Route path="/videos/:id" element={<VideoItem />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppTheme.Provider>
    );
};

export default App;
