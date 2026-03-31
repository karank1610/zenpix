import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CollectionInfo = () => {
    const { id } = useParams();
    const [collection, setCollection] = useState(null);

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

    if (!collection) return <p className="p-10">Loading...</p>;

    return (
        <div className="p-10 text-center">
            <span className="text-[50px] block mb-4 font-semibold capitalize tracking-tight bg-linear-to-r from-yellow-500 to-purple-600 bg-clip-text text-transparent leading-none">{collection.name}</span>
            <span className="text-[16px] block mb-10 font-normal tracking-tight  leading-none">{collection.images.length} Photos</span>

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
                                className="break-inside-avoid overflow-hidden rounded-lg group relative cursor-pointer"
                            >
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:scale-105 transition-transform duration-300">
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