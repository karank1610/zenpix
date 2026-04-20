import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CollectionInfo = () => {
    const { id } = useParams();
    const [collection, setCollection] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/collections/${id}`
                );
                setCollection(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCollection();
    }, [id]);

    const handleRemoveImage = async (e, img) => {
        e.stopPropagation(); // prevent navigating to image page
        try {
            await axios.patch(`http://localhost:5000/api/collections/${id}/remove-image`, {
                imageUrl: img,
            });
            setCollection((prev) => ({
                ...prev,
                images: prev.images.filter((i) => i !== img),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    if (!collection) return <p className="p-10">Loading...</p>;

    return (
        <div className="p-10 text-center">
            <span className="text-[50px] max-sm:text-[30px] block mb-3 font-semibold capitalize tracking-tight bg-linear-to-r from-yellow-500 to-purple-600 bg-clip-text text-transparent leading-none">{collection.name}</span>
            <span className="text-[16px] max-sm:text-[14px] block mb-10 font-normal tracking-tight  leading-none">{collection.images.length} Photos</span>

            {collection.images.length === 0 ? (
                <div className="h-[60vh] flex items-center justify-center">
                    <p className="text-gray-500 text-lg">
                        No images yet
                    </p>
                </div>
            ) : (
                <div className="max-w-6xl mx-auto mt-6 px-4 pb-16">
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {collection.images.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    const unsplashId = img.split("#")[1]; // ← extract after #
                                    navigate(`/image/${unsplashId}`);
                                }}
                                className="break-inside-avoid overflow-hidden rounded-lg group relative cursor-pointer"
                            >
                                <img
                                    src={img.split("#")[0]}
                                    alt=""
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-2">
                                    <button
                                        onClick={(e) => handleRemoveImage(e, img)}
                                        className="bg-white text-red-500 text-xs font-semibold px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CollectionInfo;