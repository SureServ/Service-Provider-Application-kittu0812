import { FaRegUser } from "react-icons/fa";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";
import dashboardIcon from "/public/logo/dashboard-icon.png";
import { FaArrowTrendUp } from "react-icons/fa6";
import { CiCreditCard2 } from "react-icons/ci";
import { TbShoppingCartDollar, TbShoppingCartHeart } from "react-icons/tb";

const Status = () => {
  const { data, isLoading } = useGetDashboardStatusQuery();
 

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      <div className="bg-white px-5 py-10 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total User</p>
          <h2 className="text-3xl font-semibold">{data?.userCount}</h2>
        </div>
        <FaRegUser className="text-4xl text-[#414141]" />
      </div>
      {/* <div className="bg-white px-5 py-10 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div>
          <p className="text-gray-500">Active Users </p>
          <h2 className="text-3xl font-semibold">25.1k</h2>
        </div>
        <FaRegUser className="text-4xl text-[#414141]" />
      </div> */}
      <div className="bg-white px-5 py-10 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total Service Providers</p>
          <h2 className="text-3xl font-semibold">{data?.providerCount}</h2>
        </div>
        <FaRegUser className="text-4xl text-[#414141]" />
      </div>
      <div className="bg-white px-5 py-10 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total Booking</p>
          <h2 className="text-3xl font-semibold">{data?.bookingCount}</h2>
        </div>
        <CiCreditCard2 className="text-4xl text-[#414141]" />
      </div>
      <div className="bg-white px-5 py-10 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div>
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-3xl font-semibold">{data?.totalRevenue.toFixed(2)}$</h2>
        </div>
        <TbShoppingCartDollar className="text-4xl text-[#414141]" />
      </div>

    </div>
  );
};

export default Status;