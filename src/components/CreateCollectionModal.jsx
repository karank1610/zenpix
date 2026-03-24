import { useState } from "react";

const CreateCollectionModal = ({ show, setShow, name, setName, onCreate }) => {
    const [error, setError] = useState("");

    if (!show) return null;

    const handleClick = () => {
        if (!name.trim()) {
            setError("Collection name is required");
            return;
        }
        setError("");
        onCreate();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center" onClick={() => setShow(false)}>

            <div className="bg-white p-6 rounded-xl w-80 shadow-lg" onClick={(e) => e.stopPropagation()}>

                <h2 className="text-lg font-semibold mb-3">
                    Create Collection
                </h2>


                <input
                    type="text"
                    placeholder="Collection name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-black/20"
                />


                {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                )}


                <div className="flex gap-2 mt-5">

                    <button
                        onClick={handleClick}
                        className="w-1/2 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
                    >
                        Create
                    </button>
                    <button
                        onClick={() => setShow(false)}
                        className="w-1/2 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>


                </div>

            </div>

        </div>
    );
};

export default CreateCollectionModal;