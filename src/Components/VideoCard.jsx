import { formatDistanceToNowStrict } from "date-fns";
import { useNavigate } from "react-router-dom";
import useLightDarkTheme from "../Context/LIGHTMODE"; // Import the context

const VideoCard = ({ video }) => {
    const { id, title, thumbnailUrl, viewCount, publishedAt, channel } = video;
    const { name, profileImageUrl } = channel;
    const navigate = useNavigate();
    const { theme } = useLightDarkTheme(); // Get the current theme from context

    // Convert publishedAt string to a Date object
    const formattedDate = formatDistanceToNowStrict(new Date(publishedAt), { addSuffix: true });

    return (
        <div
            className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-sm ${
                theme === 'light' ? 'bg-white' : 'bg-transparent'
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
                <div className="flex items-center space-x-3">
                    <img
                        src={profileImageUrl}
                        alt={name}
                        className="w-10 h-10 rounded-full"
                    />
                    <p className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        {name}
                    </p>
                </div>

                {/* Title */}
                <p className={`mt-2 text-md font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {title}
                </p>

                {/* Stats */}
                <div className="mt-1 flex justify-between text-sm">
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                        {viewCount} views
                    </p>
                    <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                        {formattedDate}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;