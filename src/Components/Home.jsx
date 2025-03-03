import Header from "./Header";
import SideBar from "./SideBar";
import HomePage from "./HomePage";

const Home = () => {
    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Header - Full width at top */}
            <div className="w-full">
                <Header />
            </div>

            {/* Main Content: Sidebar + Homepage */}
            <div className="flex w-full flex-row flex-grow h-full">
                {/* Sidebar - Fixed with sticky */}
                <SideBar />

                {/* Main Content (Scrollable) */}
                <div className="flex-grow w-full overflow-y-auto">
                    <HomePage />
                </div>
            </div>
        </div>
    );
};

export default Home;
