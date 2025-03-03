import Header from "./Header";
import SideBar from "./SideBar";
import TrendingVideos from "./TrendingVideos";

const Trending = () => {
    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Header - Full width at top */}
            <div className="w-full">
                <Header />
            </div>

            {/* Main Content: Sidebar + Homepage */}
            <div className="flex flex-row flex-grow h-full">
                {/* Sidebar - Fixed with sticky */}
                <SideBar />

                {/* Main Content (Scrollable) */}
                <div className="flex-grow overflow-y-auto">
                    <TrendingVideos/>
                </div>
            </div>
        </div>
    );
};

export default Trending;
