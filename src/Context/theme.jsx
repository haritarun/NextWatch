import React from "react";

const AppTheme = React.createContext({
    // activeTheme : "",
    // onChangeTheme : ()=>{},
    savedVideos : [],
    addToSavedVideos : ()=>{},
    removeFromSavedVideos : ()=>{},
    likedVideos : [],
    addToLikedVideos : ()=>{},
    removeFromLikedVideos : ()=>{},
    dislikedVideos : [],
    addToDislikedVidoes : ()=>{},
    removeFromDislikedVideos : ()=>{}
})
export default AppTheme