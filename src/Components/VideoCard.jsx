import { formatDistanceToNowStrict } from "date-fns";
import { useNavigate } from "react-router-dom";
const VideoCard = ({ video }) => {
    const { id, title, thumbnailUrl, viewCount, publishedAt, channel } = video;
    const { name, profileImageUrl } = channel;
    const navigate = useNavigate();
    // Convert publishedAt string to a Date object
    const formattedDate = formatDistanceToNowStrict(new Date(publishedAt), { addSuffix: true });

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
                <div className="flex items-center space-x-3">
                    <img
                        src={profileImageUrl}
                        alt={name}
                        className="w-10 h-10 rounded-full"
                    />
                    <p className="text-sm font-semibold text-gray-700">{name}</p>
                </div>

                {/* Title */}
                <p className="mt-2 text-md font-bold text-gray-900">{title}</p>

                {/* Stats */}
                <div className="mt-1 flex justify-between text-sm text-gray-600">
                    <p>{viewCount} views</p>
                    <p>{formattedDate}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
