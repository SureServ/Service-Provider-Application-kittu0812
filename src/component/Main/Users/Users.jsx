import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdBlock } from 'react-icons/md';
import { useGetAllUsersQuery, useUpdateStstusMutation } from '../../../redux/features/user/userApi';
import moment from 'moment';
import Url from '../../../redux/baseApi/forImageUrl';
import { toast, Toaster } from 'sonner';

const userData = [
  {
    id: 1,
    name: 'Anika Alam',
    email: 'abc@gmail.com',
    phone: '+880 18456229',
    joinDate: '2 May, 2025',
    image: '/avatars/avatar-1.png',
    status: 'active',
  },
  {
    id: 2,
    name: 'Anika Alam',
    email: 'abc@gmail.com',
    phone: '+880 18456229',
    joinDate: '2 May, 2025',
    image: '/avatars/avatar-2.png',
    status: 'blocked',
  },
  {
    id: 3,
    name: 'Anika Alam',
    email: 'abc@gmail.com',
    phone: '+880 18456229',
    joinDate: '2 May, 2025',
    image: '/avatars/avatar-3.png',
    status: 'active',
  },
  {
    id: 4,
    name: 'Anika Alam',
    email: 'abc@gmail.com',
    phone: '+880 18456229',
    joinDate: '2 May, 2025',
    image: '/avatars/avatar-4.png',
    status: 'active',
  },
];

const Users = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(selectedUser)

  const { data, isLoading } = useGetAllUsersQuery();
  console.log(data);

  const filteredUsers = data?.filter((user) => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'blocked' && user.status === 'blocked') ||
      (filter === 'active' && user.status === 'active');

    const matchSearch = user.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const showDetailsModal = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const [updateUserStatus] = useUpdateStstusMutation();
  const handleBlockUser = async (userId) => {
    // Implement block user logic here
    const data = {
      status: 'blocked'
    }
    try {
      const res = await updateUserStatus({ data, id: userId });
      console.log(res);
      toast.success('User blocked successfully');
    } catch (error) {
      console.log(error);
      toast.error(error?.message || 'Failed to block user');
    }
  };
  const handleUnBlockUser = async (userId) => {
    // Implement unblock user logic here
    const data = {
      status: 'active'
    }
    try {
      const res = await updateUserStatus({ data, id: userId });
      console.log(res);
      toast.success('User unblocked successfully');
    } catch (error) {
      console.log(error);
      toast.error(error?.message || 'Failed to unblock user');
    }
  };

  return (
    <section className="lg:p-6 py-4">
      <Toaster />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
        <h2 className="text-3xl font-semibold">User Management</h2>

        <div className="flex gap-3 flex-wrap items-center">
          <div className="flex items-center border border-yellow-500 rounded-full px-3 py-2 w-full md:w-[260px] bg-white">
            <FaSearch className="text-yellow-600 mr-2" />
            <input
              type="text"
              placeholder="Search by email"
              className="outline-none flex-1"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 flex gap-3 flex-wrap">
        {['all', 'blocked', 'active']?.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 border rounded-full ${filter === status
              ? status === 'blocked'
                ? 'bg-yellow-500 text-white'
                : status === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white'
              : status === 'blocked'
                ? 'border-yellow-500 text-yellow-600'
                : status === 'active'
                  ? 'border-green-600 text-green-600'
                  : 'border-gray-400 text-gray-700'
              }`}
          >
            {status === 'all'
              ? 'All'
              : status === 'blocked'
                ? 'Blocked'
                : 'Not Blocked'}
          </button>
        ))}
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          isLoading &&
          [1, 2, 3, 4].map((item) => (
            <div class="mx-auto w-full min-h-60 max-w-sm rounded-md border border-blue-300 p-4">
              <div class="flex animate-pulse space-x-4">
                <div class="size-10 rounded-full bg-gray-200"></div>
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-2 rounded bg-gray-200"></div>
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                      <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                    </div>
                    <div class="h-2 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        {filteredUsers?.map((user) => (
          <div
            key={user.id}
            className="bg-gray-100 rounded-lg p-4 shadow-sm"
          >
            <div className="cursor-pointer" onClick={() => showDetailsModal(user)}>
              <div className="flex items-center gap-3 mb-4">
                <img
                  // "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg"
                  src={user.profilePic}
                  alt={user.name}
                  className="rounded-full w-12 h-12 object-cover"
                />
                <div>
                  <p className="text-sm font-medium">User Name</p>
                  <p className="text-gray-800">{user.firstName + ' ' + user.lastName}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm font-medium">Joining Date</p>
                  <p className="text-gray-700">{moment(user.createdAt).format('YYYY-MM-DD')}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Telephone</p>
                  <p className="mb-2">{user.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="mb-4">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              {user.status === 'blocked' ? (
                <button onClick={() => handleUnBlockUser(user._id)} className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded hover:bg-yellow-50">
                  Unblock
                </button>
              ) : (
                <button onClick={() => handleBlockUser(user._id)} className="border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-50">
                  Block
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-sm w-full shadow-xl relative p-6">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-black">
              <IoMdClose size={22} />
            </button>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 border rounded-md overflow-hidden">
                <img
                  src={Url + selectedUser.profilePic}
                  alt={selectedUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-6 text-center text-base">
                {' '}
                <br />
                <span className="font-medium">{selectedUser.firstName + ' ' + selectedUser.lastName}</span> <br />
                <span className="font-medium">{selectedUser.email}</span> <br />
                {selectedUser.status === 'blocked' ? <span className="text-blue-600 font-semibold">unblock</span> : <span className="text-red-600 font-semibold">block</span>}

              </p>

              <div className="mt-6 flex justify-center gap-4 w-full">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100"
                >
                  Go Back
                </button>
                {/* <button
                  className="px-6 py-2 border border-red-500 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Confirm
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Users;
