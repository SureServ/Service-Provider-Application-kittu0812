/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoBagHandleSharp, IoSettingsSharp } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "/public/logo/dashboard_log.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import { RiMenuUnfold4Fill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaBriefcase, FaCopy, FaUserAlt, FaUsers } from "react-icons/fa";
import { MdDashboard, MdOutlineContactPage, MdOutlineHomeWork } from "react-icons/md";
// import { GiLightBulb } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";
import { FaRegMoneyBill1, FaSackDollar } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { GrDocumentImage } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import logoimage from '/public/logo/Logo-Orange.png';
import { AiFillCrown } from "react-icons/ai";
import { PiBabyFill, PiBuildingApartmentLight } from "react-icons/pi";
import { TfiCup } from "react-icons/tfi";
import { CiCreditCard2 } from "react-icons/ci";

const sidebarItems = [
  {
    path: "/",
    name: "Overview",
    icon: <MdDashboard className="size-6" />,
  },
  {
    path: "/users",
    name: "User Management",
    icon: <FaUsers className="size-6" />,
  },

  {
    path: "/category",
    name: "Category",
    icon: <RiMenuUnfold4Fill className="size-6" />,
  },
  // {
  //   path: "/milestone",
  //   name: "Milestone",
  //   icon: <TfiCup className="size-6" />,
  // },

  // {
  //   path: "/apartment-creator",
  //   name: "Apartment Creator",
  //   icon: <FaUsers className="size-6" />,
  // },
  // {
  //   path: "/apartment-create",
  //   name: "Apartment Create",
  //   icon: <PiBuildingApartmentLight className="size-6" />,
  // },


  {
    path: "/transactions",
    name: "Transactionsns",
    icon: <CiCreditCard2 className="size-6" />,
  },

  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsSharp className="size-6" />,
  },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.replace(`http://localhost:3030/dashboard-home`);
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden overflow-y-auto md:block w-full md:w-[200px] lg:w-[250px] xl:w-[280px] h-full  bg-[#1b2428] fixed shadow-2xl">
        <Link to={"/"} className="flex flex-col justify-center items-center pt-5 gap-2  mb-10 text-black">
          <img src={logoimage} alt="logo" className="w-[80px]  py-5 " />
        </Link>
        <ul className="flex flex-col gap-5 mt-10">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `w-[80%] mx-auto px-5 py-2 flex justify-start items-center gap-3 text-[#fff] ${isActive ? " !text-[#ffff01] rounded-md border border-[#ffff01] " : ""
                }`
              }
            >
              {item?.icon}
              <h>{item.name}</h>
            </NavLink>
          ))}
        </ul>


        <button
          onClick={() => setShowModal(true)}
          className="flex fixed bottom-5 left-3 items-center gap-2 px-10 ml-5 mt-5"
        >
          <IoIosLogOut className="size-8  p-1 text-[#fff050] rounded-md" />
          <span className="text-[#fff050] ">Logout</span>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 overflow-y-auto left-0 z-40 w-64 h-full bg-[#1b2428] shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div onClick={toggleSidebar} className="absolute top-0 right-0 p-4">
          <RxCross1 className="size-6 text-white" />
        </div>
        <div className="flex flex-col justify-center items-center pt-5 gap-2  text-white">
          <img src={logo} alt="logo" className="h-20 mb-5" />
        </div>
        <ul className="flex flex-col gap-3 mt-10">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={toggleSidebar} // Close sidebar on link click
              className={({ isActive }) =>
                `w-[70%] mx-auto px-5 py-2 flex items-center gap-3 text-white ${isActive ? "bg-[#1b2428] " : ""
                }`
              }
            >
              {item?.icon}
              <h>{item.name}</h>
            </NavLink>
          ))}
        </ul>

      </div>
      <button
        onClick={() => {
          setShowModal(true);
          toggleSidebar();
        }}
        className="flex fixed bottom-5  left-3 items-center gap-2 px-10 ml-5 mt-5"
      >
        <IoIosLogOut className="size-8 p-1 text-[#fff000] rounded-md" />
        <span className="text-[#fff000] ">Logout</span>
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
