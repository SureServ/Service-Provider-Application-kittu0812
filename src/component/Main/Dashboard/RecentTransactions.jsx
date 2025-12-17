import React from 'react';
import { Avatar } from 'antd';
import { useGetDashboardStatusQuery } from '../../../redux/features/dashboard/dashboardApi';
import Url from '../../../redux/baseApi/forImageUrl';
import moment from 'moment';

const userList = [
  {
    id: 1,
    name: 'Iva Ryan',
    amount: '$2540.58',
    flowers: '150 Flower',
    tokens: '105 LOMI',
    date: '5 May, 2025',
    image: '/avatars/avatar-1.png',
  },
  {
    id: 2,
    name: 'John Dukes',
    amount: '$2540.58',
    flowers: '150 Flower',
    tokens: '105 LOMI',
    date: '5 May, 2025',
    image: '/avatars/avatar-2.png',
  },
  {
    id: 3,
    name: 'Mary Freund',
    amount: '$2540.58',
    flowers: '150 Flower',
    tokens: '105 LOMI',
    date: '5 May, 2025',
    image: '/avatars/avatar-3.png',
  },
  {
    id: 4,
    name: 'Patricia Sanders',
    amount: '$2540.58',
    flowers: '150 Flower',
    tokens: '105 LOMI',
    date: '5 May, 2025',
    image: '/avatars/avatar-4.png',
  },
  {
    id: 5,
    name: 'Dennis Collis',
    amount: '$2540.58',
    flowers: '150 Flower',
    tokens: '105 LOMI',
    date: '5 May, 2025',
    image: '/avatars/avatar-5.png',
  },
  {
    id: 6,
    name: 'Daniel Hamilton',
    amount: '$2540.58',
    flowers: '150 Flower',
    tokens: '105 LOMI',
    date: '5 May, 2025',
    image: '/avatars/avatar-6.png',
  },
];

const RecentTransactions = () => {

  const { data, isLoading } = useGetDashboardStatusQuery();


  return (
    <div className="w-full col-span-full md:col-span-4 bg-[#f8f9fa] p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Users</h2>

      <div className="space-y-3 overflow-x-auto">
        {data?.recentUsers?.map((user) => (
          <div key={user.id} className="">
            <div className="min-w-[600px] flex justify-between items-center bg-white rounded-md px-5 py-4 shadow-sm">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Avatar src={user?.profilePic} size="large" />
                <span className="font-medium text-gray-800">{user?.firstName + user?.lastName}</span>
              </div>

              <div className="text-gray-600 whitespace-nowrap">{user.email}</div>
              {/* Amount */}
              <div className="text-[#344f47] font-semibold whitespace-nowrap">{moment(user.createdAt).fromNow()}</div>

              {/* Flowers */}
              <div className="text-gray-600 whitespace-nowrap">{user.role}</div>

              {/* Tokens */}
              <div className="text-gray-600 whitespace-nowrap">{user.contactNumber}</div>

              {/* Date */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
