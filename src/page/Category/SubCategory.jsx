import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { message } from "antd";
import {
    useCreateSubCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllSubCategoriesQuery,
} from "../../redux/features/category/categoryApi";
import { useParams } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";

const SubCategory = ({ id, subCategoryName }) => {

    if (!id) {
        return <p className=" py-10 text-2xl text-center text-red-500">Please Select a category to view its subcategories.</p>;
    }

    const [showModal, setShowModal] = useState(false);
    const [allCategory, setAllCategory] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        image: null,
    });

    /* ================= API ================= */
    const { data, isLoading: isFetching, refetch } = useGetAllSubCategoriesQuery(id);
    const [deleteCategory] = useDeleteCategoryMutation();
    console.log(data)


    const [createSubCategory, { isLoading }] =
        useCreateSubCategoryMutation();

    /* ================= EFFECTS ================= */
    useEffect(() => {
        if (data?.data?.subCategories) {
            setAllCategory(data?.data?.subCategories);
        }
    }, [data]);


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
        payload.append("categoryName", formData.name);
        payload.append("image", formData.image);

        try {
            const res = await createSubCategory({
                id,
                formDataToSend: payload,
            }).unwrap();

            console.log(res)

            if (res?.statusCode === 201) {
                message.success(res.message);
                closeModal();
                refetch();
            }
        } catch (error) {
            console.error(error);
            message.error("Failed to add sub category");
        }
    };

    const handleDeleteCategory = async (category) => {
        try {
            const res = await deleteCategory(category._id).unwrap();
            if (res?.statusCode === 200) {
                message.success(res.message);
                refetch();
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong");
        }
    };

    return (
        <div className=" py-5">
            {/* ================= HEADER ================= */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold">Sub Category {subCategoryName}</h2>

                <button
                    onClick={openModal}
                    className="bg-[#d4c707] text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                    <IoAdd className="text-3xl" /> Add Sub Category
                </button>
            </div>

            {/* ================= LIST ================= */}
            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
                    {allCategory?.map((sub) => (
                        <div
                            key={sub.id}
                            className="border relative rounded-lg p-4 text-center"
                        >
                            <button
                                onClick={() => handleDeleteCategory(sub)}
                                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
                            >
                                <MdOutlineDeleteForever className="text-xl" />
                            </button>
                            <img
                                src={sub.image}
                                alt={sub.categoryName}
                                className="w-20 h-20 mx-auto rounded-full object-cover"
                            />
                            <p className="mt-3 font-medium">
                                {sub.categoryName}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* ================= MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">
                            Add Sub Category
                        </h3>

                        <label className="block mb-2">
                            Sub Category Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            placeholder="Enter sub category name"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full border rounded px-3 py-2 mb-4"
                        />

                        <label className="block mb-2">
                            Sub Category Image
                        </label>
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
                            {isLoading
                                ? "Adding..."
                                : "Add Sub Category"}
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
