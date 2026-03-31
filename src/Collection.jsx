import { useEffect, useState } from "react";
import CreateCollectionModal from "./components/CreateCollectionModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Collection = () => {
    const [collections, setCollections] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchcollections = async () => {
            const res = await axios.get("http://localhost:5000/api/collections");
            setCollections(res.data)
        };
        fetchcollections();
    }, []);

    const handleCreate = async () => {
        if (!name.trim()) return;
        try {
            const res = await axios.post("http://localhost:5000/api/collections", {
                name,
            });
            setCollections([...collections, res.data]);
            setName("");
            setShowModel(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="collection-main my-10">
                <div className="max-w-400 mx-auto px-4">
                    <div className="top-content flex flex-col text-center items-center justify-center gap-4 py-4">
                        <span className="text-[40px] font-semibold tracking-tight bg-linear-to-r from-yellow-500 to-purple-600 bg-clip-text text-transparent leading-none">Collections</span>
                        <span className="font-normal max-w-sm">Explore the world through collections of beautiful photos free to use under the <a href="/" className="font-semibold underline">Unsplash License</a>.</span>
                    </div>
                    <div className="collection-cards-main">
                        <div className="collection-cards-child-main">
                            <div className="collection-cards-child">
                                <div className="grid grid-cols-3 gap-6 mt-6">
                                    {
                                        collections.map((col) => (
                                            <div
                                                key={col._id}
                                                onClick={()=> navigate(`/Collection/${col._id}`)}
                                                className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition">
                                                {/* cover image */}
                                                <div className="h-70 grid grid-cols-2 grid-rows-2 gap-1 bg-gray-200">

                                                    {col.images.length > 0 ? (
                                                        col.images.slice(0, 4).map((img, i) => (
                                                            <img
                                                                key={i}
                                                                src={img}
                                                                alt=""
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ))
                                                    ) : (
                                                        <div className="col-span-2 row-span-2 flex items-center justify-center">
                                                            <span className="text-gray-400">No Images</span>
                                                        </div>
                                                    )}

                                                </div>
                                                {/* info */}
                                                <div className="flex flex-col justify-center-center p-3 px-6">
                                                    <span className="font-semibold text-lg">{col.name}</span>
                                                    <span className="text-sm text-gray-500">
                                                        {col.images.length} images
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }


                                    <div
                                        onClick={() => setShowModel(true)}
                                        className="h-90 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
                                    >
                                        <span className="text-5xl text-gray-500">+</span>
                                        <span className="text-gray-500 text-3xl font-bold mt-1">New Collection</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModel && (
                    <CreateCollectionModal
                        show={showModel}
                        setShow={setShowModel}
                        name={name}
                        setName={setName}
                        onCreate={handleCreate} />
                )
            }
        </>
    )
}

export default Collection;