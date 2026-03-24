import { FiSearch } from "react-icons/fi";

const Home = () => {
    return (
        <>
            <div className="home-main relative my-16">
                <img src="assets/img/hero-image.png" alt="" className="w-full object-cover" />
                <div className="search-main absolute top-1/3 left-1/2 -translate-1/2">
                    <div className="container">
                        <div className="search-inner flex flex-col justify-center items-center text-center gap-2">
                            <span className="text-[45px] font-bold tracking-tight">Search</span>
                            <span className="text-gray-600 tracking-tight">Search high-resolution images from Unsplash</span>
                            <div className="search-box relative">
                                <input type="text" placeholder="Enter your keywords..." className="mt-3 px-4 py-5 w-160 tracking-tight rounded-lg outline-none ring-1 ring-gray-300 inset-shadow-sm focus:shadow-xl focus:ring-2 focus:ring-gray-300 transition" />
                                <FiSearch className=" text-3xl text-gray-300 my-1.5 absolute top-1/2 right-1 -translate-1/2 hover:text-gray-400 transition" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;