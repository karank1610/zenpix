import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ImageInfo = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [collections, setCollections] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState([]);

    const fetchCollections = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/collections");
            setCollections(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
                    headers: {
                        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
                    },
                })
                setImage(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImage();
        fetchCollections();
    }, [id]);

    const toggleCollection = async (id) => {
        setSelectedCollection((prev) =>
            prev.includes(id) ?
                prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleSaveToCollection = async () => {
        try {
            const result = await Promise.all(
                selectedCollection.map(async (id) => {
                    const col = collections.find((c) => c._id === id);
                    if (col.images.includes(image.urls.small)) {
                        return { name: col.name, alreadyExists: true };
                    }
                    await axios.patch(`http://localhost:5000/api/collections/${id}/add-image`,
                        {
                            imageUrl: image.urls.small,
                        }
                    );
                    return { name: col.name, alreadyExists: false };
                })
            );
            setShowModal(false);
            setSelectedCollection([]);
            fetchCollections();

            const added = result.filter((r) => !r.alreadyExists).map((r) => r.name);
            const existing = result.filter((r) => r.alreadyExists).map((r) => r.name);

            if (existing.length > 0) alert(`Image already exists in: ${existing.join(",")}`);
            if (added.length > 0) alert(`Image added to: ${added.join(",")}`);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemoveFromCollection = async (e, id) => {
        e.stopPropagation();
        try {
            const col = collections.find((c) => c._id === id);
            if (!col.images.includes(image.urls.small)) {
                alert("Image not in this collection");
                return;
            }
            await axios.patch(`http://localhost:5000/api/collections/${id}/remove-image`, {
                imageUrl: image.urls.small,
            });
            fetchCollections();
            alert(`Image removed from: "${col.name}"`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDownload = async () => {
        try {
            await axios.get(image.links.download_location, {
                headers: {
                    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
                }
            })
            const res = await fetch(image.urls.full);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${image.id}.jpg`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <>
            {(!image) && <div className="loader opacity-50"></div>}

            <div className="info-main my-10 mx-80">


                {/* TRUE 50-50 GRID */}
                <div className="grid grid-cols-[1.2fr_1fr] gap-10 items-start">

                    {/* LEFT SIDE (IMAGE) */}
                    <div className="w-full">
                        <div className="w-full aspect-320/410 rounded-md overflow-hidden bg-gray-100 shadow-lg">
                            <img
                                src={image?.urls?.regular}
                                alt="img"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col gap-6 max-w-xl">

                        {/* AUTHOR */}
                        <div className="flex items-center gap-3">
                            <img
                                src={image?.user?.profile_image?.medium}
                                alt="profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-semibold">{image?.user?.name}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(image?.created_at).toDateString()}
                                </p>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowModal(true) }}
                                className="px-6 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                                Add to Collection
                            </button>
                            <button 
                            onClick={handleDownload}
                            className="px-6 border py-2 rounded-md hover:bg-gray-100 transition">
                                Download
                            </button>
                        </div>

                        {/* COLLECTIONS */}
                        <div>
                            <div className="font-semibold text-2xl mb-3">Collections</div>

                            <div className="flex flex-col gap-3">
                                {collections.map((col) => {
                                    const isSelected = selectedCollection.includes(col._id);
                                    return (
                                        <div
                                            key={col._id}
                                            onClick={() => toggleCollection(col._id)}
                                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer group
                ${isSelected
                                                    ? "bg-black text-white"
                                                    : "hover:bg-gray-100"  // ← hover only when NOT selected
                                                }`}
                                        >
                                            {col.images.length > 0 ? (
                                                <img
                                                    src={col.images[0]}
                                                    alt="img"
                                                    className="w-12 h-12 rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                                                    <span className="text-[9px] text-gray-400 text-center">No Image</span>
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{col.name}</p>
                                                <p className={`text-xs ${isSelected ? "text-gray-300" : "text-gray-500"}`}>
                                                    {col.images.length} images
                                                </p>
                                            </div>

                                            {/* removed tick, kept remove button */}
                                            {!isSelected && (
                                                <button
                                                    onClick={(e) => handleRemoveFromCollection(e, col._id)}
                                                    className="hidden group-hover:block text-xs text-red-500 mr-5">
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                        {selectedCollection.length > 0 && (
                            <button
                                onClick={handleSaveToCollection}
                                className="px-6 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                                Save to {selectedCollection.length} Collection{selectedCollection.length > 1 ? "s" : ""}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default ImageInfo;