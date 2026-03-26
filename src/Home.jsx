import axios from "axios";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Home = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            setLoading(true);
            const res = await axios.get(`https://api.unsplash.com/search/photos`, {
                params: { query, per_page: 20 },
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
                },
            });
            setImages(res.data.results);
            setSearched(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-main">

            {/* HERO SECTION */}
            {!searched && (
                <div className="relative">
                    <img
                        src="assets/img/hero-image.png"
                        alt=""
                        className="w-full mt-10 object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0" />

                    {/* Search over hero */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
                        <div className="flex flex-col items-center text-center gap-3">

                            <span className="text-5xl font-bold tracking-tight text-black">
                                Search
                            </span>

                            <span className="text-gray-400 tracking-tight">
                                Search high-resolution images from Unsplash
                            </span>

                            <div className="relative mt-3">
                                <input
                                    type="text"
                                    placeholder="Enter your keywords..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    className="mt-3 px-4 py-5 w-160 tracking-tight rounded-lg outline-none ring-1 ring-gray-300 inset-shadow-sm focus:shadow-xl focus:ring-2 focus:ring-gray-300 transition"
                                />
                                <FiSearch
                                    onClick={handleSearch}
                                    className="text-2xl absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* SEARCH RESULT MODE */}
            {searched && (
                <>
                    {/* Sticky search bar */}
                    <div className="sticky top-0 z-50 bg-linear-to-r from-yellow-500 to-purple-600 py-4 shadow-sm flex justify-center px-4">
                        <div className="relative w-full max-w-2xl top-10">
                            <input
                                type="text"
                                placeholder="Search images..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="px-4 py-3 w-full rounded-lg outline-none ring-1 bg-white ring-white shadow-lg transition"
                            />
                            <FiSearch
                                onClick={handleSearch}
                                className="text-2xl absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition"
                            />
                        </div>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="loader "></div>
                    )}

                    {/* Masonry-style image grid */}
                    {!loading && (
                        <div className="max-w-6xl mx-auto mt-15 px-4 pb-16">
                            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                                {images.map((img) => (
                                    <div
                                        key={img.id}
                                        className="break-inside-avoid overflow-hidden rounded-lg group relative cursor-pointer"
                                    >
                                        <img
                                            src={img.urls.small}
                                            alt={img.alt_description || "image"}
                                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Hover overlay with photographer name */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                            <span className="text-white text-sm font-medium">
                                                📷 {img.user.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No results */}
                    {!loading && images.length === 0 && (
                        <div className="flex justify-center items-center mt-20 text-gray-400 text-lg">
                            No images found. Try a different keyword.
                        </div>
                    )}
                </>
            )}

        </div>
    );
};

export default Home;