import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoriesQuery,
    useUpdateCategoryMutation,
} from "../../redux/features/category/categoryApi";
import { message } from "antd";
import { Link } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import SubCategory from "./SubCategory";

const Category = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const { data, isLoading, refetch } = useGetAllCategoriesQuery({ page, limit });
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [id, setId] = useState(null);
    const [subCategoryName, setSubCategoryName] = useState("");

    const totalPage = data?.data?.pagination?.pages || 0;

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    // console.log(categories)

    const [formData, setFormData] = useState({
        name: "",
        image: null,
    });

    /* ================= FETCH DATA ================= */
    useEffect(() => {
        if (data?.data?.categories) {
            setCategories(data.data.categories);
            setId(data.data.categories[0]?._id);
        }

    }, [data]);

    if (isLoading) return <div>Loading...</div>;

    /* ================= MODAL HANDLERS ================= */
    const openAddModal = () => {
        setShowAddModal(true);
        setEditingCategory(null);
        setFormData({ name: "", image: null });
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        setShowAddModal(false);
        setFormData({
            name: category.categoryName,
            image: category.image,
        });
    };

    const closeModal = () => {
        setEditingCategory(null);
        setShowAddModal(false);
        setFormData({ name: "", image: null });
    };

    /* ================= IMAGE HANDLER ================= */
    const handleCategoryImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    /* ================= SAVE (ADD / EDIT) ================= */
    const handleSave = async () => {
        const payload = new FormData();
        payload.append("categoryName", formData.name);

        if (formData.image instanceof File) {
            payload.append("image", formData.image);
        }

        try {
            if (editingCategory) {
                const res = await updateCategory({
                    id: editingCategory._id,
                    data: payload,
                }).unwrap();

                console.log(res)

                if (res?.statusCode === 200) {
                    message.success(res.message);
                    closeModal();
                    refetch();
                }
            } else {
                const res = await createCategory(payload).unwrap();
                if (res?.statusCode === 201) {
                    message.success(res.message);
                    closeModal();
                    refetch();
                }
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong");
        }
    };

    /* ================= SEARCH ================= */
    const filteredCategories = categories?.filter((cat) =>
        cat.categoryName?.toLowerCase().includes(search.toLowerCase())
    );

    /* ================= PAGINATION ================= */
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 rounded border transition
                        ${page === i
                            ? "bg-yellow-500 text-white border-yellow-500"
                            : "bg-white hover:bg-gray-100"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };




    const handleDeleteCategory = async (categoryId) => {

        try {
            const res = await deleteCategory(categoryId?._id).unwrap();
            if (res?.statusCode === 200) {
                message.success(res.message);
                refetch();
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong");
        }

    }

    return (
        <div className="lg:p-6 py-4">
            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
                <h2 className="text-3xl font-semibold">Category Management</h2>

                <div className="flex gap-3 flex-wrap items-center">
                    <div className="flex items-center border border-yellow-500 rounded-full px-3 py-3 w-full md:w-[260px] bg-white">
                        <FaSearch className="text-yellow-600 mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-none flex-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={openAddModal}
                        className="bg-[#d4c707] text-white px-8 py-3 rounded-full flex items-center gap-1"
                    >
                        <IoAdd className="text-3xl" /> Add Category
                    </button>
                </div>
            </div>

            {/* ================= GRID ================= */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
                {filteredCategories?.map((category) => (
                    <div
                        key={category._id}
                        className={`relative min-h-20 flex items-center justify-center border border-[#fff000] bg-white rounded-lg shadow ${id === category._id ? 'ring-4 ring-yellow-300' : ''}`}
                    >
                        <button
                            onClick={() => openEditModal(category)}
                            className="absolute top-3 right-3 bg-blue-500 text-white p-2 rounded-full"
                        >
                            <FiEdit2 />
                        </button>
                        <button
                            onClick={() => handleDeleteCategory(category)}
                            className="absolute top-3 right-12 bg-red-500 text-white p-2 rounded-full"
                        >
                            <MdOutlineDeleteForever className="text-xl" />
                        </button>

                        <div onClick={() => (
                            setId(category._id),
                            setSubCategoryName(category.categoryName)
                        )} className="p-4 cursor-pointer flex flex-col items-center">
                            <div className="w-20 h-20 border rounded-full mb-2 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.categoryName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-lg font-semibold">
                                {category.categoryName}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= PAGINATION ================= */}
            {
                totalPage > 1 && (
                    <div className="flex justify-end items-center gap-2 mt-8 flex-wrap">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {renderPageNumbers()}

                        <button
                            disabled={page === totalPage}
                            onClick={() => setPage(page + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )
            }

            {/* ================= MODAL ================= */}
            {
                (editingCategory || showAddModal) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingCategory ? "Edit Category" : "Add Category"}
                            </h3>

                            <label className="block mb-2">Category Title</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full border rounded px-3 py-2 mb-4"
                            />

                            <label className="block mb-2">Category Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleCategoryImageChange}
                                className="w-full border rounded px-3 py-2"
                            />

                            {formData.image && (
                                <img
                                    src={
                                        formData.image instanceof File
                                            ? URL.createObjectURL(formData.image)
                                            : formData.image
                                    }
                                    alt="Preview"
                                    className="w-20 h-20 mt-3 rounded object-cover"
                                />
                            )}

                            <button
                                onClick={handleSave}
                                className="w-full mt-4 py-2 bg-yellow-500 text-white rounded"
                            >
                                {editingCategory ? "Save Changes" : "Add Category"}
                                {isCreating ? " ..." : ""}
                            </button>

                            <button
                                onClick={closeModal}
                                className="w-full mt-2 py-2 border border-red-400 text-red-600 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }

            <div>
                <SubCategory id={id} subCategoryName={subCategoryName} />
            </div>

        </div >
    );
};

export default Category;