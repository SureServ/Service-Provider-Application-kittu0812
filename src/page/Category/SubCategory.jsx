import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { message } from "antd";
import { useCreateSubCategoryMutation } from "../../redux/features/category/categoryApi";

const SubCategory = () => {
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        image: null,
    });

    const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();

    /* ================= HANDLERS ================= */
    const openModal = () => {
        setShowModal(true);
        setFormData({ name: "", image: null });
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ name: "", image: null });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleSave = async () => {
        if (!formData.name || !formData.image) {
            return message.warning("Name and image are required");
        }

        const payload = new FormData();
        payload.append("subCategoryName", formData.name);
        payload.append("image", formData.image);

        try {
            const res = await createSubCategory(payload).unwrap();
            if (res?.statusCode === 201) {
                message.success(res.message);
                closeModal();
            }
        } catch (error) {
            console.error(error);
            message.error("Failed to add sub category");
        }
    };

    return (
        <div className="lg:p-6 py-4">
            {/* ================= HEADER ================= */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold">Sub Category</h2>

                <button
                    onClick={openModal}
                    className="bg-[#d4c707] text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                    <IoAdd className="text-2xl" /> Add Sub Category
                </button>
            </div>

            {/* ================= MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">
                            Add Sub Category
                        </h3>

                        <label className="block mb-2">Sub Category Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2 mb-4"
                        />

                        <label className="block mb-2">Sub Category Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border rounded px-3 py-2"
                        />

                        {formData.image && (
                            <img
                                src={URL.createObjectURL(formData.image)}
                                alt="Preview"
                                className="w-20 h-20 mt-3 rounded object-cover"
                            />
                        )}

                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="w-full mt-4 py-2 bg-yellow-500 text-white rounded"
                        >
                            {isLoading ? "Adding..." : "Add Sub Category"}
                        </button>

                        <button
                            onClick={closeModal}
                            className="w-full mt-2 py-2 border border-red-400 text-red-600 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubCategory;
