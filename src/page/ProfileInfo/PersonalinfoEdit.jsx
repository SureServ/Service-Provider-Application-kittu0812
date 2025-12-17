import { Button, Form, Input, message, Upload } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import defaultUserImage from "/public/Auth/user.png";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useGetUserProfileQuery, useUpdateProfileMutation } from "../../redux/features/setting/settingApi";
import Url from "../../redux/baseApi/forImageUrl";

const PersonalinfoEdit = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { data: userProfile, isLoading, refetch } = useGetUserProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();
    const user = userProfile;

    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState(defaultUserImage);
    const [updateImage, setUpdateImage] = useState(null);
    const [contactNumber, setcontactNumber] = useState("");

    // ✅ **Load User Data When API Call Completes**
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.firstName || "",
                email: user.email || "",
            });
            setcontactNumber(user.contactNumber || "");
            setImageUrl(user.profilePic);
        }
    }, [user, form]);

    // ✅ **Handle File Upload & Preview**
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList[0]?.originFileObj) {
            const reader = new FileReader();
            reader.readAsDataURL(newFileList[0].originFileObj);
            reader.onload = () => setImageUrl(reader.result);
        }
    };

    // ✅ **Handle Form Submission**



    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleUpdateProfile = async (values) => {
        const formData = new FormData();
        formData.append("firstName", values.name);
        formData.append("contactNumber", contactNumber);

        if (fileList[0]?.originFileObj) {
            formData.append("profilePic", fileList[0].originFileObj);
        }

        try {

            const response = await updateProfile(formData).unwrap();
            console.log(response);

            if (response) {
                message.success(response?.message || "Profile updated successfully!");
                navigate("/settings/personal-info");
            }

        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="font-[Aldrich]">
            {/* ✅ Back Button */}
            <div onClick={() => navigate("/settings/personal-info")} className="flex items-center cursor-pointer ml-6 my-8">
                <MdOutlineKeyboardArrowLeft size={30} />
                <h1 className="text-xl font-medium ml-2">Edit Profile</h1>
            </div>

            <div className="sm:mx-6 rounded-xl bg-white">
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleUpdateProfile}
                >
                    <div className="flex flex-col lg:flex-row gap-10 py-5">
                        {/* ✅ Profile Picture Section */}

                        {/* ✅ Form Inputs Section */}
                        <div className="flex-1 lg:max-w-[700px] w-full border lg:border-[#fff050] mx-auto p-6">
                            <div className="flex flex-col items-center w-full mb-5 ">
                                <div className="relative sm:w-36 w-24 sm:h-36 h-24 rounded-full flex justify-center items-center mt-5 bg-gray-50 border">
                                    <Upload name="profile" showUploadList={false} onChange={handleUploadChange}>
                                        <img className="w-32 h-32 rounded-full" src={imageUrl} alt="Profile" />
                                        <Button className="border-none text-md text-blue-500 absolute bottom-6 flex items-center" icon={<LuImagePlus size={20} className="mr-2" />}>
                                            Change Picture
                                        </Button>
                                    </Upload>
                                </div>

                                <div className="text-center mt-6">
                                    <p className="text-lg">Admin</p>
                                    <h1 className="text-2xl font-medium">{user?.fullName || "N/A"}</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Form.Item label={<span className="text-lg font-medium">Name</span>} name="name">
                                    <Input placeholder="Name" className="p-4 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                                </Form.Item>

                                <Form.Item label={<span className="text-lg font-medium">Email</span>} name="email">
                                    <Input placeholder="Email" className="p-4 rounded-lg border-gray-300" readOnly />
                                </Form.Item>

                                <div className="flex flex-col">
                                    <label className="text-lg font-medium mb-2">Phone Number</label>
                                    <Input
                                        as={PhoneInput}
                                        placeholder="Enter phone number"
                                        value={contactNumber}
                                        onChange={setcontactNumber}
                                        className="p-4 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ✅ Save Changes Button */}
                    <div className="flex sm:justify-end justify-center items-center mt-2 p-2">
                        <Button htmlType="submit" className="h-14 md:px-20 !bg-[#fff050] !text-black rounded-lg text-lg font-medium">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default PersonalinfoEdit;
