import React from 'react'
import ReactPlayer from 'react-player'

// Render a YouTube video player

const VideoItemDetails = (props) => {
    const {url}=props
    return (
        <ReactPlayer url={url}
        width="100%"  // Adjust width
        height="450px" // Adjust height
        controls={true} // Show player controls
        playing={false} // Video doesn't auto-play
        loop={false} // No looping
        />
    )
}
export default VideoItemDetails;