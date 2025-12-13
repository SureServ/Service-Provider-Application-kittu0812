/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { RiNotificationFill } from "react-icons/ri";
import userImage from "/public/Auth/user.png";
import { MdNotificationsNone } from "react-icons/md";
import { useGetUserProfileQuery } from "../../../redux/features/setting/settingApi";
import { useEffect } from "react";
import Url from "../../../redux/baseApi/forImageUrl";
import { useGetAllNotificationQuery } from "../../../redux/features/notification/notification";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const { data: userProfile, refetch } = useGetUserProfileQuery();

  const { data } = useGetAllNotificationQuery()
  const notifications = data?.count;

  const user = userProfile?.data;
  // console.log(user); 

  useEffect(() => {
    refetch();
  }, [refetch]);


  return (
    <div className="w-full px-5 py-3.5 bg-[#1b2428] flex justify-between items-center text-white sticky top-0 left-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
      </div>

      <div className="flex justify-between items-center gap-5">
        <Link to={"/notification"}>
          <h1 className="relative text-[#ffffff] p-2 rounded-lg border border-white">
            <MdNotificationsNone className="size-8" />
            <span className="absolute top-0 right-0 w-5 h-5 text-[#1b2428] text-xs flex justify-center items-center bg-[#ffff01] rounded-md">{notifications > 99 ? "99+" : notifications || "0"}</span>
          </h1>

        </Link>
        <Link className="flex items-center gap-2 border border-[#ffff01] p-2 rounded-lg" to={"/settings/personal-info"}>
          <img
            className="w-8 rounded-full"
            src={user?.profilePic ? Url + user?.profilePic : userImage}
            alt="User Profile"
          />
          <h1 className="">{user?.firstName || "Admin"}</h1>
        </Link>

      </div>
    </div>
  );
};

export default Header;