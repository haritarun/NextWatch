import { useNavigate } from "react-router-dom";
import useLightDarkTheme from "../Context/LIGHTMODE"; // Import the context

const GamingVideoCard = ({ video }) => {
    const { id, title, thumbnailUrl, viewCount } = video;
    const navigate = useNavigate();
    const { theme } = useLightDarkTheme(); // Get the current theme from context

    return (
        <div
            className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-sm ${
                theme === 'light' ? 'bg-transparent' : 'bg-transparent'
            }`}
            onClick={() => navigate(`/videos/${id}`)}
        >
            {/* Thumbnail */}
            <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-48 object-cover rounded-sm"
            />

            {/* Video Info */}
            <div className="p-4">
                {/* Title */}
                <p className={`mt-2 text-md font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {title}
                </p>

                {/* Stats */}
                <div className="mt-1 flex justify-between text-sm">
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                        {viewCount} Watching Worldwide
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GamingVideoCard;