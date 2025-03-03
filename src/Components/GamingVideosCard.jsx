import { useNavigate } from "react-router-dom";


const GamingVideoCard = ({ video }) => {
    const { id, title, thumbnailUrl, viewCount } = video;
    const navigate = useNavigate();

    // Convert publishedAt string to a Date object
    

    return (
        <div className="overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-sm" onClick={() => navigate(`/videos/${id}`)}>
            {/* Thumbnail */}
            <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-48 object-cover rounded-sm"
            />

            {/* Video Info */}
            <div className="p-4">
                
                {/* Title */}
                <p className="mt-2 text-md font-bold text-gray-900">{title}</p>

                {/* Stats */}
                <div className="mt-1 flex justify-between text-sm text-gray-600">
                    <p>{viewCount}   Watching Worldwide</p>
                    
                </div>
            </div>
        </div>
    );
};

export default GamingVideoCard;
